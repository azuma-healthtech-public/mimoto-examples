import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../providers/loginflow.dart';

class Welcome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final currentFlow = Provider.of<LoginFlowProvider>(context, listen: false);

    return Scaffold(
        appBar: AppBar(
          backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          title: const Text("Mimoto Flutter CE: Welcome"),
        ),
        body: SingleChildScrollView(
          child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Column(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      const Divider(),
                      Text(currentFlow?.userEmail ?? "-"),
                      const Divider(),
                      SizedBox(
                        width: 300,
                        child: Text(currentFlow?.idTokenClaims ?? '',
                            maxLines: 200, overflow: TextOverflow.ellipsis),
                      ),
                      const Divider(),
                      ElevatedButton(
                        onPressed: () {
                          final currentFlow = Provider.of<LoginFlowProvider>(
                              context,
                              listen: false);
                          currentFlow.reset();

                          // clear history
                          while (context.canPop() == true) {
                            context.pop();
                          }
                          context.pushReplacement("/");
                        },
                        child: const Text("reset"),
                      ),
                      const Divider()

                    ])
              ]),
        ));
  }
}
