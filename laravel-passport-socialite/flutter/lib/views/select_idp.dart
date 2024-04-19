import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;
import 'package:provider/provider.dart';

import '../constants.dart';
import '../model/idp.dart';
import '../providers/loginflow.dart';

class SelectIdp extends StatefulWidget {
  const SelectIdp({super.key});

  @override
  State<SelectIdp> createState() => _SelectIdpState();
}

class _SelectIdpState extends State<SelectIdp> {
  late Future<List<Idp>> availableIdsp;

  Future<List<Idp>> fetchIdpList() async {
    final response = await http.get(Uri.parse(MimotoConstants.idp_list_endpoint + "?relayingPartyId=" + MimotoConstants.relayingPartyId));
    if (response.statusCode == 200) {
      return (jsonDecode(response.body) as List).map((data) => Idp.fromJson(data)).toList();
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception('Failed to load idps');
    }
  }

  @override
  void initState() {
    super.initState();
    availableIdsp = fetchIdpList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select IDP'),
      ),
      body: Center(
        child: FutureBuilder<List<Idp>>(
          future: availableIdsp,
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return ListView.builder(
                  padding: const EdgeInsets.all(8),
                  itemCount: snapshot.data!.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Container(
                        height: 50,
                        child: Center(
                          child: ElevatedButton(
                              onPressed: () {
                                final currentFlow = Provider.of<LoginFlowProvider>(context, listen: false);
                                currentFlow.setupForProviderLogin(snapshot.data![index].issuer);
                                context.go("/login-idp");
                              },
                              child: Text('${snapshot.data![index].organizationName}')),
                        ));
                  });
            } else if (snapshot.hasError) {
              return Text('${snapshot.error}');
            }

            // By default, show a loading spinner.
            return const CircularProgressIndicator();
          },
        ),
      ),
    );
  }
}
