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

package joinserver

import (
	"context"

	"go.thethings.network/lorawan-stack/pkg/errors"
	"go.thethings.network/lorawan-stack/pkg/interop"
)

type interopServer struct {
	JS *JoinServer
}

var errInteropNotImplemented = errors.DefineUnimplemented("interop_not_implemented", "interop endpoint not implemented")

func (srv interopServer) JoinRequest(ctx context.Context, req *interop.JoinReq) (*interop.JoinAns, error) {
	return nil, errInteropNotImplemented
}
