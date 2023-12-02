import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class prescription extends StatefulWidget {
  const prescription({super.key});

  @override
  State<prescription> createState() => _prescriptionState();
}

class _prescriptionState extends State<prescription> {
  late String op = "tanay";
  String? id = "";
  late String idf = "";
  Future<String?> getEhsidFromLocalStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? ehsid = prefs.getString('ehsid');
    setState(() {
      op = ehsid!;
      idf = ehsid;
    });
    // print(ehsid);
    // id = ehsid;
    // print(idf);
    // print(id);

    return ehsid;
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getEhsidFromLocalStorage();
    postData();
  }

  List<dynamic> hospitals = [];

  Future<void> postData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? ehsidx = prefs.getString('ehsid');
    String idx = ehsidx ?? "";
    print(idx);
    // storeLoginDetails(MobileNo);
    final String apiUrl =
        'https://ehs-q3hx.onrender.com/api/fetchPatientPrescription/${idx}'; // Replace with your API URL

    // Define your request body as a Map or other data structure.

    // Encode the request body as JSON.

    try {
      final http.Response response = await http.get(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      if (response.statusCode == 200) {
        // Successfully posted data
        print('Response data: ${response.body.runtimeType}');
        print('Response data: ${response.body}');

        setState(() {
          hospitals = json.decode(response.body);
          print(hospitals);
          // print(hospdetails["status"]);
          // hospitals = hospdetails["data"];
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          SizedBox(
            height: 100.0,
          ),
          Center(
              child: Text(
            "PRESCRIPTION",
            style: TextStyle(
              fontSize: 24, // Set the font size
              fontWeight: FontWeight.bold, // Set the font weight to bold
              color: Colors.blue, // Set the text color
              // You can add more styles as needed, such as fontFamily, letterSpacing, etc.
            ),
          )),
          Container(
            height: 500,
            width: 200,
            child: ListView.builder(
              itemCount: hospitals.length,
              itemBuilder: (BuildContext context, int index) {
                // return Text(
                //   hospitals[index]["fullname"],
                // );
                return Container(
                  child: Container(
                    margin: EdgeInsets.all(10.0),
                    padding: EdgeInsets.all(10.0),
                    width: double.infinity,
                    height: 60.0,
                    decoration: BoxDecoration(
                      borderRadius:
                          BorderRadius.circular(9), // Apply border radius
                      color: Colors.white, // Set background color to #FFF
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.25),
                          offset: Offset(0, 2),
                          blurRadius: 8,
                          spreadRadius: -3,
                        ),
                      ],
                    ),
                    child: Column(
                      children: [
                        // Text(
                        //   hospitals[index]["appointment_data"]["cause"] != null
                        //       ? hospitals[index]["diagnosis_data"]["cause"]
                        //       : 'No cause',
                        // )
                        // Text(
                        //   hospitals[index]["fullname"],
                        // ),
                      ],
                    ),
                  ),
                );
              },
            ),
          )
        ],
      ),
    );
  }
}
