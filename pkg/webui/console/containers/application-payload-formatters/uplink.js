// Copyright © 2019 The Things Network Foundation, The Things Industries B.V.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react'
import bind from 'autobind-decorator'
import { connect } from 'react-redux'
import { defineMessages } from 'react-intl'

import toast from '../../../components/toast'
import PropTypes from '../../../lib/prop-types'
import PayloadFormattersForm from '../../components/payload-formatters-form'
import PAYLOAD_FORMATTER_TYPES from '../../components/payload-formatters-form/types'
import { getApplicationId } from '../../../lib/selectors/id'
import { updateApplicationLinkSuccess } from '../../store/actions/link'
import {
  selectApplicationIsLinked,
  selectApplicationLinkFormatters,
} from '../../store/selectors/application'

import api from '../../api'

const m = defineMessages({
  title: 'Uplink payload formatters',
  updateSuccess: 'Successfully set uplink payload formatter',
})

@connect(function (state) {
  const application = state.application.application
  const formatters = selectApplicationLinkFormatters(state) || {}

  return {
    appId: getApplicationId(application),
    linked: selectApplicationIsLinked(state) || false,
    type: formatters.up_formatter || PAYLOAD_FORMATTER_TYPES.NONE,
    parameter: formatters.up_formatter_parameter || '',
  }
},
dispatch => ({
  updateLinkSuccess: link => dispatch(updateApplicationLinkSuccess(link)),
}))
@bind
class ApplicationPayloadFormatters extends React.PureComponent {

  static propTypes = {
    appId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    parameter: PropTypes.string.isRequired,
    updateLinkSuccess: PropTypes.func.isRequired,
    linked: PropTypes.bool.isRequired,
  }

  async onSubmit (values) {
    const { appId } = this.props

    return await api.application.link.set(appId, {
      default_formatters: {
        up_formatter: values.type,
        up_formatter_parameter: values.parameter,
      },
    })
  }

  onSubmitSuccess (link) {
    const { appId, updateLinkSuccess } = this.props
    toast({
      title: appId,
      message: m.updateSuccess,
      type: toast.types.SUCCESS,
    })
    updateLinkSuccess(link)
  }

  render () {
    const { type, parameter, linked } = this.props

    return (
      <PayloadFormattersForm
        uplink
        linked={linked}
        onSubmit={this.onSubmit}
        onSubmitSuccess={this.onSubmitSuccess}
        title={m.title}
        initialType={type}
        initialParameter={parameter}
      />
    )
  }
}

export default ApplicationPayloadFormatters
