import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mimoto_flutter_ce/constants.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';

import '../providers/loginflow.dart';

class LoginIdp extends StatefulWidget {
  LoginIdp({super.key});

  @override
  State<LoginIdp> createState() => _LoginIdpState();
}

class _LoginIdpState extends State<LoginIdp> {
  String? _error;

  continueToWelcome() {
    if (!context.mounted) return;
    while (context.canPop() == true) {
      context.pop();
    }
    context.pushReplacement("/welcome");
  }

  executeAuth(LoginFlowProvider flow) async {
    try {
      // Only for simulation flow
      if (MimotoConstants.clientId == MimotoConstants.clientIdSimulation) {
        final codeResponse = await flow.executeAuthRequest();
        await flow.executeCodeExchangeInternal(Uri.parse(codeResponse!));
        continueToWelcome();
        return;
      }

      final url = await flow.executeAuthRequest();
      if (url != null) {
        launchUrl(Uri.parse(url));
      } else {
        setState(() {
          _error = "Could not login ...";
        });
        print("No URL returned");
      }
    } catch (err) {
      setState(() {
        _error = "Could not login ex ...";
      });
      print('Error: $err');
    }
  }

  executeExchange(BuildContext ctx, LoginFlowProvider flow) async {
    try {
      await flow.executeCodeExchange();
      continueToWelcome();
    } catch (err) {
      setState(() {
        _error = "Could not login ex ...";
      });
      print('Error: $err');
    }
  }

  @override
  void initState() {
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((_) {
      final currentFlow = Provider.of<LoginFlowProvider>(context, listen: false);
      print("Current flow stage: ${currentFlow.stage}. Provider: ${currentFlow.provider}");

      switch (currentFlow.stage) {
        case Stage.none:
          executeAuth(currentFlow);
          break;

        case Stage.authRequest:
          // something went wrong?
          _error = "Could not login? (User returned to screen)";
          break;

        case Stage.codeExchangeRequest:
          executeExchange(context, currentFlow);
          break;
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login IDP'),
      ),
      body: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Column(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Visibility(visible: _error != null, child: const Text("Could not login ...")),
                const CircularProgressIndicator(),
                ElevatedButton(
                    onPressed: () {
                      final currentFlow = Provider.of<LoginFlowProvider>(context, listen: false);
                      currentFlow.reset();

                      // clear history
                      while (context.canPop() == true) {
                        context.pop();
                      }
                      context.pushReplacement("/");
                    },
                    child: const Text('Cancel')),
              ],
            )
          ],
        ),
      ),
    );
  }
}
