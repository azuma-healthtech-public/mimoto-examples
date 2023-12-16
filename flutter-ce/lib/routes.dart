import 'package:go_router/go_router.dart';
import 'package:mimoto_flutter_ce/providers/loginflow.dart';
import 'package:mimoto_flutter_ce/views/login_idp.dart';
import 'package:mimoto_flutter_ce/views/select_idp.dart';
import 'package:provider/provider.dart';

import 'views/home.dart';
import 'views/welcome.dart';

final router = GoRouter(
  routes: [
    GoRoute(path: '/', builder: (context, state) => Home(), routes: [
      GoRoute(path: 'select-idp', builder: (context, state) => SelectIdp()),
      GoRoute(path: 'login-idp', builder: (context, state) => LoginIdp()),
      GoRoute(
          path: 'code/ce',
          builder: (context, state) {
            final currentFlow = Provider.of<LoginFlowProvider>(context, listen: false);
            print("Received code/ce app link. Current flow stage: ${currentFlow.stage}. Provider: ${currentFlow.provider}");
            currentFlow.prepareCodeExchangeMimotoDeepLink(state.uri);

            return LoginIdp();
          }),
      GoRoute(path: 'welcome', builder: (context, state) => Welcome()),
    ]),
  ],
);
