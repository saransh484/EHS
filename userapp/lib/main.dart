import 'package:userapp/pages/bookap.dart';
import 'package:userapp/pages/generaldet.dart';
import 'package:userapp/pages/home.dart';
import 'package:userapp/pages/login1.dart';
import 'package:userapp/pages/login2.dart';
import 'package:userapp/pages/login3.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:userapp/pages/uprofile.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  late bool? isloggedin;

  Future<bool?> getloginFromLocalStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    setState(() {
      isloggedin = prefs.getBool('isloggedin');
      print("islogged in  :  $isloggedin");
    });

    return isloggedin;
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getloginFromLocalStorage();
  }

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      // home: login1(),
      initialRoute: "/",
      routes: {
        '/': (context) => isloggedin == true ? (HomePage()) : (login1()),
      },
    );
  }
}
