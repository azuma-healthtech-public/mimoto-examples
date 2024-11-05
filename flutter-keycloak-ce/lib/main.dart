import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'providers/loginflow.dart';
import 'routes.dart';

void main() {
  runApp(const MimotoApp());
}

class MimotoApp extends StatelessWidget {
  const MimotoApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    // Using MultiProvider is convenient when providing multiple objects.
    return MultiProvider(
        providers: [
          Provider<LoginFlowProvider>(create: (context) => LoginFlowProvider()),
        ],
        child: MaterialApp.router(
          title: 'Mimoto Flutter CE',
          theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
            useMaterial3: true,
          ),
          routerConfig: router,
        ));
  }
}
