// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:oauth2/oauth2.dart' as oauth2;
import 'package:uuid/uuid.dart';

import '../constants.dart';
import '../model/auth.dart';
import '../model/exchange.dart';
import '../model/token_exchange.dart';

class TokenExchangeProvider {
  static String tokenUrl = "https://ne-mimoto-examples-keycloak.azurewebsites.net/realms/mimoto-eid/protocol/openid-connect/token";

  static Future<TokenExchangeResponse> executeTokenExchange(String idToken) async {

    // See KeyCloak documentation at https://www.keycloak.org/docs/latest/securing_apps/#external-token-to-internal-token-exchange
    // The credentials should be stored in a backend application, which should handle the call towards KeyCloak
    // For demo purposes, keeping the credentials here!

    // Hint: Before executing token exchange, you could als check if user already exists and if not, trigger the registration process

    String clientId = "token-exchange-client";
    String clientSecret = "ccrlRFicMUXtqb3C0K7B5BEWRq2x2jH2";

    final response = await http.post(Uri.parse(tokenUrl),
        headers: <String, String>{
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          'client_id': clientId,
          'client_secret': clientSecret,
          'grant_type': "urn:ietf:params:oauth:grant-type:token-exchange",
          'subject_token': idToken,
          'subject_issuer': "https://mimoto-test.pie.azuma-health.tech/",
          'subject_token_type': "urn:ietf:params:oauth:token-type:id_token",
          'audience': "token-exchange-client",
          'scope': "openid email profile" // Request your needed scopes here
        });
    if (response.statusCode == 200) {
      return TokenExchangeResponse.fromJson(jsonDecode(response.body));
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to get exchange data');
    }
  }
}
