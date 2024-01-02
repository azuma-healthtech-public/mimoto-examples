import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: const Text("mimoto Flutter CE"),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            context.go("/select-idp");
          },
          child: const Text('Login with Gesundheits-ID'),
        ),
      ),
    );
  }
}
