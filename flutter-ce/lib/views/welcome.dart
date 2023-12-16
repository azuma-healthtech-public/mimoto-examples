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
        body: Center(
          child: Row(mainAxisAlignment: MainAxisAlignment.center, crossAxisAlignment: CrossAxisAlignment.center, children: [
            Column(mainAxisAlignment: MainAxisAlignment.spaceEvenly, children: [
              Text(currentFlow?.userEmail ?? "-"),
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
                child: const Text("reset"),
              ),
            ])
          ]),
        ));
  }
}
