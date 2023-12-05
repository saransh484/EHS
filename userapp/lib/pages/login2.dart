import 'package:userapp/pages/login3.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';
// import 'package:fluttertoast/fluttertoast.dart';

class login2 extends StatefulWidget {
  final String phone;
  final String hash;
  final String otp;
  const login2(
      {Key? key, required this.phone, required this.hash, required this.otp});

  @override
  State<login2> createState() => _login2State();
}

class _login2State extends State<login2> {
  TextEditingController otp = TextEditingController();

  late Map<String, dynamic> ehsid;

  late Map<String, dynamic> logindetails;
  Future<void> postData(var MobileNo) async {
    // storeLoginDetails(MobileNo);
    final String apiUrl =
        'https://ehs-q3hx.onrender.com/api/verifyOTP'; // Replace with your API URL

    // Define your request body as a Map or other data structure.
    Map<String, dynamic> requestBody = {
      "phone": widget.phone,
      "hash": widget.hash,
      "otp": otp.text,
    };

    print(requestBody);
    // Encode the request body as JSON.
    final String requestBodyJson = jsonEncode(requestBody);

    try {
      final http.Response response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: requestBodyJson,
      );

      if (response.statusCode == 200) {
        // Successfully posted data
        print('Response data: ${response.body.runtimeType}');
        setState(() {
          logindetails = json.decode(response.body);
          print(logindetails);
        });
      } else {
        // Handle error responses
        print('Error: ${response.statusCode}');
        print('Error message: ${response.body}');
      }
    } catch (e) {
      // Handle network or other errors
      print('Error: $e');
    }
  }

  Future<void> getdata() async {
    final String apiUrl =
        'https://ehs-q3hx.onrender.com/api/fetchUHID/:${widget.phone}'; // Replace with your API URL

    try {
      final http.Response response = await http.get(
        Uri.parse(apiUrl),
      );

      if (response.statusCode == 200) {
        // Successfully posted data
        print('Response data: ${response.body.runtimeType}');
        setState(() {
          ehsid = json.decode(response.body);
          print('hue hue ${ehsid}');

          saveEhsidToLocalStorage(ehsid['data']);
        });
      } else {
        // Handle error responses
        print('Error: ${response.statusCode}');
        print('Error message: ${response.body}');
      }
    } catch (e) {
      // Handle network or other errors
      print('Error: $e');
    }
  }

  void saveEhsidToLocalStorage(String ehsid) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    // String ehsidJson = json.encode(ehsid);
    prefs.setString('ehsid', ehsid);
    print('Ehsid data saved to local storage');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          child: Column(
            children: [
              Image(
                image: AssetImage('assets/Framesecond.png'),
                height: 179.71,
                width: 359.68,
                fit: BoxFit.cover,
              ),
              SizedBox(
                height: 100.0,
              ),
              Text(widget.otp),
              Container(
                child: Text(
                  'Enter OTP',
                  style: TextStyle(
                    fontSize: 24,
                  ),
                ),
              ),
              SizedBox(
                height: 10,
              ),
              Container(
                child: Text(
                  'an otp has been sent to ${widget.phone}',
                  style: TextStyle(
                    fontSize: 12,
                  ),
                ),
              ),
              SizedBox(
                height: 20.0,
              ),
              Container(
                width: 300,
                child: Card(
                  elevation: 5,
                  child: TextFormField(
                    controller: otp,
                    keyboardType: TextInputType.phone,
                    decoration: InputDecoration(
                      filled: true,
                      fillColor: Colors.white,
                      hintText: 'enter otp',
                      contentPadding: EdgeInsets.all(12.0),
                    ),
                  ),
                ),
              ),
              SizedBox(
                height: 20.0,
              ),
              Container(
                child: Align(
                  alignment: Alignment.center,
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text('Not received the OTP ?'),
                      SizedBox(
                        width: 10.0,
                      ),
                      Text(
                        'Resend it',
                        style: TextStyle(
                          color: Colors.blue, // Set text color to blue
                          decoration: TextDecoration
                              .underline, // Add underline decoration
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              SizedBox(
                height: 30.0,
              ),
              SizedBox(
                width: 250,
                height: 42.0,
                child: ElevatedButton(
                  onPressed: () async {
                    postData(widget.phone);
                    getdata();
                    if (logindetails["message"] == "Success") {
                      SharedPreferences prefs =
                          await SharedPreferences.getInstance();

                      prefs.setBool("isloggedin", true);
                      print('login status saved to local storage');
                      Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => login3(phone: widget.phone)));
                    } else {
                      SharedPreferences prefs =
                          await SharedPreferences.getInstance();

                      prefs.setBool("isloggedin", false);
                      print('login status saved to local storage');
                      // Fluttertoast.showToast(msg: "incorrect otp!");
                      // Center(
                      //   child: ElevatedButton(
                      //     onPressed: () {
                      //       // Show the dialog
                      //       showDialog(
                      //         context: context,
                      //         builder: (BuildContext context) {
                      //           // return object of type Dialog
                      //           return AlertDialog(
                      //             title: Text('Popup Title'),
                      //             content:
                      //                 Text('This is a Flutter popup example.'),
                      //             actions: <Widget>[
                      //               // usually buttons at the bottom of the dialog
                      //               TextButton(
                      //                 child: Text('Close'),
                      //                 onPressed: () {
                      //                   Navigator.of(context).pop();
                      //                 },
                      //               ),
                      //             ],
                      //           );
                      //         },
                      //       );
                      //     },
                      //     child: Text('incorrect otp'),
                      //   ),
                      // );
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    primary: Color(0xFFE55771),
                  ),
                  child: Text(
                    'Next',
                    style: TextStyle(color: Colors.white),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
