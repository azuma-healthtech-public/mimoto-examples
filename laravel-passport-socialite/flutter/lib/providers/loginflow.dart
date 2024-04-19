// Copyright 2019 The Flutter team. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:oauth2/oauth2.dart' as oauth2;
import 'package:uuid/uuid.dart';

import '../constants.dart';
import '../model/auth.dart';
import '../model/exchange.dart';

class LoginFlowProvider {
  Stage stage = Stage.none;

  String? state;
  oauth2.AuthorizationCodeGrant? grant;

  String? provider;
  String? exchangeDeepLinkCode;
  String? exchangeDeepLinkState;

  oauth2.Credentials? credentials;
  String? laravelAccessToken;
  String? laravelUser;

  void setupForProviderLogin(String selectedProvider) {
    var uuid = const Uuid();

    stage = Stage.none;
    state = uuid.v4();
    grant = null;
    exchangeDeepLinkCode = null;
    exchangeDeepLinkState = null;
    provider = selectedProvider;
    credentials = null;
    laravelAccessToken = null;
    laravelUser = null;
  }

  Future<String?> executeAuthRequest() async {
    if (stage != Stage.none) throw Exception("Unexpected stage ${stage}. Expected: ${Stage.none}");

    stage = Stage.authRequest;

    // (1) create auth url
    grant =
        oauth2.AuthorizationCodeGrant(MimotoConstants.clientId, Uri.parse(MimotoConstants.authorization_endpoint), Uri.parse(MimotoConstants.token_endpoint));

    var initialAuthUrl = grant!.getAuthorizationUrl(Uri.parse(MimotoConstants.redirectUrl), scopes: MimotoConstants.scopes.toList(), state: state!);

    // add &reponse_format=json to avoid automatic redirects, response in json format:
    // { "url": "..." }
    var fullAuthUrl = "${initialAuthUrl.toString()}&provider=${provider!}&response_format=json";

    // (2) get target url from mimoto (this should be the idp authenticator deep link)
    var response = await http.get(Uri.parse(fullAuthUrl));
    if (response.statusCode == 200) {
      print("Auth PAR response URL returned: ");
      return AuthResponse.fromJson(jsonDecode(response.body)).url;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to get execute par');
    }
  }

  Future<String?> executeAuthRequestSimulation() async {
    if (stage != Stage.none) throw Exception("Unexpected stage ${stage}. Expected: ${Stage.none}");

    stage = Stage.authRequest;

    // (1) create auth url
    grant =
        oauth2.AuthorizationCodeGrant(MimotoConstants.clientId, Uri.parse(MimotoConstants.authorization_endpoint), Uri.parse(MimotoConstants.token_endpoint));

    var initialAuthUrl = grant!.getAuthorizationUrl(Uri.parse(MimotoConstants.redirectUrl), scopes: MimotoConstants.scopes.toList(), state: state!);
    var fullAuthUrl = "${initialAuthUrl.toString()}&provider=${provider!}";

    // (2) open auth url without redirects --> this will return the par response from mimoto
    final client = HttpClient();
    var request = await client.getUrl(Uri.parse(fullAuthUrl));
    request.followRedirects = false;

    var response = await request.close();
    if (response.statusCode == 302) {
      return response.headers["Location"]?.single;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to execute auth request');
    }
  }

  void prepareCodeExchangeMimotoDeepLink(Uri uri) {
    if (stage != Stage.authRequest) return;

    stage = Stage.codeExchangeRequest;
    exchangeDeepLinkState = uri.queryParameters["state"];
    exchangeDeepLinkCode = uri.queryParameters["code"];
  }

  Future<String> executeCodeExchangeMimotoDeepLink() async {
    if (stage != Stage.codeExchangeRequest) throw Exception("Unexpected stage ${stage}. Expected: ${Stage.codeExchangeRequest}");

    final response = await http.post(Uri.parse(MimotoConstants.exchange_endpoint),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'code': exchangeDeepLinkCode!,
          'state': exchangeDeepLinkState!,
          'clientId': MimotoConstants.clientId,
        }));

    if (response.statusCode == 200) {
      return ExchangeResponse.fromJson(jsonDecode(response.body)).redirectUrl;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to get exchange data');
    }
  }

  Future executeCodeExchangeInternal(Uri response) async {
    final result = await grant!.handleAuthorizationResponse(response.queryParameters);
    print("Code-Exchange: Internal done");

    print("Token-Exchange");
    final teResponse = await http.post(Uri.parse("${BackendConstants.url}/token/exchange"),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{'idToken': result.credentials.idToken!}));

    if (teResponse.statusCode == 200) {
      print("Token-Exchange: done");
      laravelAccessToken = teResponse.body;
      laravelUser = null;

      await executeGetUser();
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      laravelAccessToken = null;
      laravelUser = null;
      throw Exception('Failed to exchange tokens');
    }
  }

  Future executeGetUser() async {
    final response = await http.get(Uri.parse("${BackendConstants.url}/user"), headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
      'Authorization': 'Bearer ${laravelAccessToken!}',
    });
    if (response.statusCode == 200) {
      laravelUser = response.body;
    } else {
      throw Exception('Failed to get user');
    }
  }

  Future executeCodeExchange() async {
    if (stage != Stage.codeExchangeRequest) throw Exception("Unexpected stage ${stage}. Expected: ${Stage.codeExchangeRequest}");

    final mimotoExchangeResponse = await executeCodeExchangeMimotoDeepLink();
    final mimotoExchangeResponseUri = Uri.parse(mimotoExchangeResponse);
    print("Code-Exchange: Mimoto done");

    await executeCodeExchangeInternal(mimotoExchangeResponseUri);
  }

  void reset() {
    stage = Stage.none;
    state = null;
    grant = null;
    provider = null;
    exchangeDeepLinkCode = null;
    exchangeDeepLinkState = null;
    credentials = null;
    laravelAccessToken = null;
    laravelUser = null;
  }
}

enum Stage {
  none,
  authRequest,
  codeExchangeRequest,
}
