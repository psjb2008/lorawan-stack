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

const storeSelector = state => state.configuration

export const gsFrequencyPlansSelector = function (state) {
  const store = storeSelector(state)

  return store.gsFrequencyPlans || []
}

export const nsFrequencyPlansSelector = function (state) {
  const store = storeSelector(state)

  return store.nsFrequencyPlans || []
}

export const errorSelector = function (state) {
  const store = storeSelector(state)

  return store.error
}

export const fetchingSelector = function (state) {
  const store = storeSelector(state)

  return store.fetching
}
