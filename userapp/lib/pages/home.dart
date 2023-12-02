import 'package:userapp/pages/bookap.dart';
import 'package:userapp/pages/campdetailed.dart';
import 'package:userapp/pages/doctordetailed.dart';
import 'package:userapp/pages/generaldet.dart';
import 'package:userapp/pages/hospital.dart';
import 'package:userapp/pages/login1.dart';
import 'package:userapp/pages/prescription.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:userapp/pages/prescrib.dart';
import 'package:userapp/pages/uprofile.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HomePage extends StatefulWidget {
  HomePage();
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  TextEditingController _queryController = TextEditingController();
  late String? name;
  late String? mail;
  late String? number;
  Future<void> getuserdetailsFromLocalStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();

    name = prefs.getString("name");
    mail = prefs.getString("mail");
    number = prefs.getString("phone");
  }

  void _handleSubmitted(String text) {
    print('Entered query: $text');
  }

  @override
  Widget build(BuildContext context) {
    return appBar();
  }

  late String op;

  Future<String?> getEhsidFromLocalStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? ehsid = prefs.getString('ehsid');
    setState(() {
      op = ehsid!;
    });

    return ehsid;
  }

  List<String> boxData = [
    'Box 1',
    'Box 2',
    'Box 3',
    'Box 4',
    'Box 5', /* Add more items */
  ];
  List<String> docs = [
    'Doc 1',
    'Doc 2',
    'Doc 3',
    'Doc 4',
    'Doc 5', /* Add more items */
  ];
  List<Color> boxColors = [
    const Color.fromARGB(255, 70, 163, 240),
    const Color.fromARGB(255, 123, 241, 127),
    Color.fromARGB(255, 247, 130, 122),
    const Color.fromARGB(255, 244, 190, 108),
    const Color.fromARGB(255, 222, 96, 245)
  ];
  List<Color> boxColors1 = [
    Color.fromARGB(255, 2, 57, 101),
    Color.fromARGB(255, 3, 101, 6),
    Color.fromARGB(255, 122, 11, 3),
    Color.fromARGB(255, 132, 80, 2),
    const Color.fromARGB(255, 81, 1, 95)
  ];
  late Map<String, dynamic> campdetails;

  List<dynamic> camps = [];
  late Map<String, dynamic> docdetails;

  List<dynamic> doctors = [];

  Future<void> postData() async {
    // storeLoginDetails(MobileNo);
    final String apiUrl =
        'https://ehs-q3hx.onrender.com/api/getCamps'; // Replace with your API URL

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
        // Successfully pos sted data
        print('Response data: ${response.body.runtimeType}');
        setState(() {
          // campdetails = json.decode(response.body);
          // // print(hospdetails);
          // print(campdetails["status"]);
          // camps = campdetails["data"];
          camps = json.decode(response.body);

          // print(camps.runtimeType);
          // print(camps);
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

  Future<void> postDataDoc() async {
    // storeLoginDetails(MobileNo);
    final String apiUrl =
        'https://ehs-q3hx.onrender.com/api/fetchDR/653ed82877abbcd6e6d1c4c6'; // Replace with your API URL

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
        // Successfully pos sted data
        print('Response data: ${response.body.runtimeType}');
        setState(() {
          // campdetails = json.decode(response.body);
          // // print(hospdetails);
          // print(campdetails["status"]);
          // camps = campdetails["data"];
          doctors = json.decode(response.body);
          print(doctors.runtimeType);
          print(doctors);
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
  void initState() {
    // TODO: implement initState
    super.initState();
    postData();
    postDataDoc();
    getEhsidFromLocalStorage();
    getuserdetailsFromLocalStorage();
  }

  Scaffold appBar() {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 50.0,
        elevation: 0,
        backgroundColor: Colors.white,
        title: Column(
          children: [
            Container(
                margin: const EdgeInsets.only(top: 20.0, bottom: 5.0),
                child: Row(
                  children: [
                    Expanded(
                      child: Container(
                        margin: const EdgeInsets.only(right: 20.0),
                        decoration: BoxDecoration(boxShadow: [
                          BoxShadow(
                            color: const Color(0xff1D1617).withOpacity(0.40),
                            blurRadius: 10,
                            spreadRadius: 0.0,
                          )
                        ]),
                        // height: 35.0,

                        // child: Expanded(
                        child: TextField(
                            controller: _queryController,
                            onSubmitted: _handleSubmitted,
                            decoration: InputDecoration(
                              hintText: 'Enter your query',
                              alignLabelWithHint: true,
                              filled: true,
                              fillColor: Colors.white,
                              prefixIcon: const Icon(Icons.search),
                              // contentPadding: EdgeInsets.all(20),
                              border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(5),
                                borderSide: BorderSide.none,
                              ),
                            )),
                      ),
                      // ),
                    ),
                    Container(
                        decoration: BoxDecoration(
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xff1D1617).withOpacity(0.40),
                              blurRadius: 1,
                              spreadRadius: -2.0,
                            )
                          ],
                          borderRadius: BorderRadius.circular(20.0),
                        ),
                        margin: const EdgeInsets.only(left: 10.0, right: 0.0),
                        child: Container(
                          height: 40.0,
                          width: 40.0,
                          child: IconButton(
                              onPressed: () {
                                Navigator.of(context).push(MaterialPageRoute(
                                    builder: (context1) => const uprof()));
                              },
                              icon: const Icon(Icons.person)),
                        )),
                  ],
                )),
            const SizedBox(
              height: 10,
            )
          ],
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.person), // User profile icon
            onPressed: () {
              Navigator.of(context).push(
                  MaterialPageRoute(builder: (context1) => const uprof()));
            },
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: buildBody(),
      ),
      // child: Container(
      //   child: Column(mainAxisAlignment: MainAxisAlignment.center, children: [
      //     Text(
      //       'Update Profile',
      //       style: TextStyle(fontSize: 20.0, fontWeight: FontWeight.bold),
      //     ),
      //     SizedBox(
      //       height: 16.0,
      //     ),
      //     Text(
      //       'update your information to get insights',
      //       style: TextStyle(fontSize: 10.0, fontWeight: FontWeight.normal),
      //     )
      //   ]),
      // ),
      drawer: Drawer(
        child: Container(
          child: Column(children: [
            Container(
              margin: const EdgeInsets.all(15),
              padding: const EdgeInsets.all(15),
              decoration: const BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                    color: Colors.grey, // Set the color of the bottom border
                    width: 1.5, // Set the width of the bottom border
                  ),
                ),
              ),
              child: Row(children: [
                Container(
                  margin: const EdgeInsets.only(left: 0, top: 60),
                  width: 80,
                  height: 80,
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    image: DecorationImage(
                      fit: BoxFit.cover,
                      image: AssetImage('assets/sahil.jpeg'),
                    ),
                  ),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Container(
                    margin: const EdgeInsets.only(
                        top: 60), // Set the top margin value as needed
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          name!,
                          style: const TextStyle(
                              fontSize: 18, fontWeight: FontWeight.bold),
                        ),
                        Text(
                          'ID: ${op}',
                          style: const TextStyle(fontSize: 14),
                        ),
                        Text(
                          mail!,
                          style: const TextStyle(fontSize: 12),
                        )
                      ],
                    ),
                  ),
                )
              ]),
            ),
            Container(
                child: Column(
              crossAxisAlignment: CrossAxisAlignment
                  .start, // Align children to the start (left)
              children: <Widget>[
                Container(
                  margin: const EdgeInsets.only(left: 20),
                  alignment: Alignment.centerLeft,
                  child: const Text(
                    'Profile',
                    textAlign: TextAlign.start,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Container(
                  alignment: Alignment.centerLeft,
                  width: double.infinity,
                  height: 70,
                  padding: const EdgeInsets.only(left: 10.0, top: 14.0),
                  margin: const EdgeInsets.only(left: 16.0, right: 16.0),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFEFEF),
                    borderRadius: BorderRadius.circular(
                        10.0), // Adjust the radius as needed
                  ),
                  child: Column(
                    children: [
                      GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => GeneralDet()),
                          );
                        },
                        child: const Text('Edit Profile'),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                      const Text('Add Adhar')
                    ],
                  ),
                )
              ],
            )),
            const SizedBox(
              height: 40.0,
            ),
            Container(
                child: Column(
              crossAxisAlignment: CrossAxisAlignment
                  .start, // Align children to the start (left)
              children: <Widget>[
                Container(
                  margin: const EdgeInsets.only(left: 20),
                  alignment: Alignment.centerLeft,
                  child: const Text(
                    'Preferences',
                    textAlign: TextAlign.start,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Container(
                  alignment: Alignment.centerLeft,
                  width: double.infinity,
                  height: 100,
                  padding: const EdgeInsets.only(left: 10.0, top: 14.0),
                  margin: const EdgeInsets.only(left: 16.0, right: 16.0),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFEFEF),
                    borderRadius: BorderRadius.circular(
                        10.0), // Adjust the radius as needed
                  ),
                  child: const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Change language'),
                      SizedBox(
                        height: 5,
                      ),
                      Text('Notifications'),
                      SizedBox(
                        height: 5,
                      ),
                      Text('Data Sharing'),
                      SizedBox(height: 5),
                    ],
                  ),
                )
              ],
            )),
            const SizedBox(
              height: 25,
            ),
            Container(
                child: Column(
              crossAxisAlignment: CrossAxisAlignment
                  .start, // Align children to the start (left)
              children: <Widget>[
                Container(
                  margin: const EdgeInsets.only(left: 20),
                  alignment: Alignment.centerLeft,
                  child: const Text(
                    'Security',
                    textAlign: TextAlign.start,
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Container(
                  alignment: Alignment.centerLeft,
                  width: double.infinity,
                  height: 50,
                  padding: const EdgeInsets.only(left: 10.0, top: 14.0),
                  margin: const EdgeInsets.only(left: 16.0, right: 16.0),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFEFEF),
                    borderRadius: BorderRadius.circular(
                        10.0), // Adjust the radius as needed
                  ),
                  child: const Column(
                    children: [
                      Text('Enable Biometric'),
                      SizedBox(
                        height: 5,
                      ),
                    ],
                  ),
                )
              ],
            )),
            const SizedBox(
              height: 14,
            ),
            Container(
                child: Column(
              crossAxisAlignment: CrossAxisAlignment
                  .start, // Align children to the start (left)
              children: <Widget>[
                const SizedBox(
                  height: 10,
                ),
                Container(
                  alignment: Alignment.centerLeft,
                  width: double.infinity,
                  height: 50,
                  padding: const EdgeInsets.only(left: 10.0, top: 14.0),
                  margin: const EdgeInsets.only(left: 16.0, right: 16.0),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFEFEF),
                    borderRadius: BorderRadius.circular(
                        10.0), // Adjust the radius as needed
                  ),
                  child: const Column(
                    children: [
                      Text('About EHS'),
                      SizedBox(
                        height: 5,
                      ),
                    ],
                  ),
                )
              ],
            )),
            const SizedBox(
              height: 0,
            ),
            Container(
                child: Column(
              crossAxisAlignment: CrossAxisAlignment
                  .start, // Align children to the start (left)
              children: <Widget>[
                const SizedBox(
                  height: 10,
                ),
                Container(
                  alignment: Alignment.centerLeft,
                  width: double.infinity,
                  height: 50,
                  padding: const EdgeInsets.only(left: 10.0, top: 14.0),
                  margin: const EdgeInsets.only(left: 16.0, right: 16.0),
                  decoration: BoxDecoration(
                    color: const Color(0xFFEFEFEF),
                    borderRadius: BorderRadius.circular(
                        10.0), // Adjust the radius as needed
                  ),
                  child: Column(
                    children: [
                      GestureDetector(
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => const login1()),
                          );
                        },
                        child: const Text('Logout'),
                      ),
                      const SizedBox(
                        height: 5,
                      ),
                    ],
                  ),
                )
              ],
            )),
          ]),
        ),
      ),
    );
  }

  Widget buildBody() {
    return Container(
      child: Container(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(
              height: 30,
            ),
            Container(
              height: 150.0,
              margin: const EdgeInsets.only(top: 10.0, left: 10.0, right: 10.0),
              decoration: const BoxDecoration(
                color: Color(0xFFE55771),
                borderRadius: BorderRadius.all(
                  Radius.circular(10.0), // Adjust the radius as needed
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Container(
                    padding: const EdgeInsets.only(
                      top: 20.0,
                      left: 16.0,
                      bottom: 5.0,
                    ),
                    margin: const EdgeInsets.only(
                      top: 1.0,
                    ),
                    decoration: const BoxDecoration(
                        // color: Color(0xFFE55771),
                        ),
                    child: const Text(
                      'Update Profile',
                      style: TextStyle(
                          fontSize: 24.0, fontWeight: FontWeight.bold),
                    ),
                  ),
                  Container(
                    padding: const EdgeInsets.only(top: 1.0, left: 16.0),
                    child: const Text(
                      'update your information \n to get insights',
                      style: TextStyle(fontSize: 16.0),
                    ),
                  ),
                  Container(
                    margin: const EdgeInsets.only(
                        left: 16.0, right: 16.0, top: 20.0),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(30.0),
                      color: Colors.transparent,
                      border: Border.all(
                        color: const Color.fromRGBO(239, 116, 138, 1),
                      ),
                    ),
                    child: const LinearProgressIndicator(
                      backgroundColor: Color.fromRGBO(239, 116, 138, 1),
                      value: 0.5,
                      valueColor: AlwaysStoppedAnimation<Color>(Colors.white),
                    ),
                  ),
                ],
              ),
            ),
            // Add more children here, for example:
            Container(
              padding: const EdgeInsets.all(10.0),
              child: Row(
                children: <Widget>[
                  // First Box
                  // GeneralDet

                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const prescrib()),
                        );
                      },
                      child: Container(
                        padding: const EdgeInsets.all(5.0),
                        height: 70.0,
                        margin: const EdgeInsets.all(5.0),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(
                              10.0), // Adjust the radius as needed
                          boxShadow: [
                            const BoxShadow(
                              color: Colors.grey, // Shadow color
                              offset: Offset(0, 3), // Offset of the shadow
                              blurRadius: 5.0, // Blur radius
                              spreadRadius: 0.0, // Spread radius
                            ),
                          ],
                        ),
                        child: const Center(
                          child: Text(
                            'Health History',
                            style: TextStyle(
                                fontSize: 14.0, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ),
                  ),

                  // Second Box
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => bookap(
                                    name: name!,
                                  )),
                        );
                      },
                      child: Container(
                        padding: const EdgeInsets.all(5.0),
                        height: 70.0,
                        margin: const EdgeInsets.all(5.0),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(
                              10.0), // Adjust the radius as needed
                          boxShadow: [
                            const BoxShadow(
                              color: Colors.grey, // Shadow color
                              offset: Offset(0, 3), // Offset of the shadow
                              blurRadius: 5.0, // Blur radius
                              spreadRadius: 0.0, // Spread radius
                            ),
                          ],
                        ),
                        child: const Center(
                          child: Text(
                            'Book Appointment',
                            style: TextStyle(
                                fontSize: 14.0, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ),
                  ),

                  // Third Box
                  Expanded(
                    child: GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => hospital(
                                    name: name!,
                                  )),
                        );
                      },
                      child: Container(
                        padding: const EdgeInsets.all(5.0),
                        height: 70.0,
                        margin: const EdgeInsets.only(
                          left: 5.0,
                          right: 5.0,
                        ),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(
                              10.0), // Adjust the radius as needed
                          boxShadow: [
                            const BoxShadow(
                              color: Colors.grey, // Shadow color
                              offset: Offset(0, 3), // Offset of the shadow
                              blurRadius: 5.0, // Blur radius
                              spreadRadius: 0.0, // Spread radius
                            ),
                          ],
                        ),
                        child: const Center(
                          child: Text(
                            'Hospitals',
                            style: TextStyle(
                                fontSize: 14.0, fontWeight: FontWeight.bold),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
            Container(
                margin: const EdgeInsets.all(5.0),
                padding: const EdgeInsets.only(
                  top: 5.0,
                ),
                height: 60.0,
                decoration: const BoxDecoration(
                  color: Color(0xFF2A2B3F),
                  borderRadius: BorderRadius.all(
                    Radius.circular(10.0), // Adjust the radius as needed
                  ),
                ),
                child: const Column(
                  children: [
                    Text(
                      "No more ads !",
                      style: TextStyle(
                        fontSize: 22.0,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    Text(
                      'subscribe to ehs+ for seamless view',
                      style: TextStyle(
                        fontSize: 10.0,
                        fontWeight: FontWeight.normal,
                        color: Colors.white,
                      ),
                    )
                  ],
                )),
            const Padding(
              padding: EdgeInsets.only(
                  left: 16.0), // Set left margin (adjust the value as needed)
              child: Text(
                'Camps',
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
            ),

            GestureDetector(
              child: Container(
                margin: const EdgeInsets.only(
                    top: 5.0, left: 5.0, right: 5.0, bottom: 2.0),
                height: 100.0, // Set a fixed height for the Container
                child: ListView.builder(
                  scrollDirection: Axis.horizontal, // Scroll horizontally
                  itemCount: camps.length,
                  itemBuilder: (BuildContext context, int index) {
                    final color = boxColors[index % boxColors.length];
                    final color1 = boxColors[index % boxColors1.length];

                    return GestureDetector(
                      onTap: () => {
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => campdetailed(
                                  title: camps[index]["title"],
                                  age: camps[index]["age"],
                                  enddate: camps[index]["end_date"],
                                  boost: camps[index]["boost"],
                                  id: camps[index]["HospitalID"],
                                  // pin: camps[index]["pin"]
                                )))
                      },
                      child: Container(
                        width:
                            150.0, // Set a fixed width for each item (adjust as needed)
                        margin: const EdgeInsets.only(right: 5.0, left: 5.0),
                        decoration: BoxDecoration(
                          // color: color,
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [color, color],
                          ),
                          borderRadius: BorderRadius.circular(
                              10.0), // Adjust the radius as needed
                          boxShadow: [
                            const BoxShadow(
                              color: Colors.grey, // Shadow color
                              offset: Offset(0, 3), // Offset of the shadow
                              blurRadius: 5.0, // Blur radius
                              spreadRadius: 0.0, // Spread radius
                            ),
                          ],
                        ),
                        child: Center(
                          child: Text(
                            camps[index]["title"],
                            style: const TextStyle(fontSize: 20.0),
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),
            const Padding(
              padding: EdgeInsets.only(
                  left: 16.0), // Set left margin (adjust the value as needed)
              child: Text(
                'Doctor',
                style: TextStyle(
                  fontSize: 20.0,
                  fontWeight: FontWeight.bold,
                  color: Colors.blue,
                ),
              ),
            ),
            GestureDetector(
              child: Container(
                margin: const EdgeInsets.only(
                    top: 5.0, left: 5.0, right: 5.0, bottom: 2.0),
                height: 100.0, // Set a fixed height for the Container
                child: ListView.builder(
                  scrollDirection: Axis.horizontal, // Scroll horizontally
                  itemCount: doctors.length,
                  itemBuilder: (BuildContext context, int index) {
                    // final color = boxColors[index % boxColors.length];
                    final color = boxColors[index % boxColors.length];
                    final color1 = boxColors1[index % boxColors1.length];

                    return GestureDetector(
                      onTap: () => {
                        Navigator.of(context).push(MaterialPageRoute(
                          builder: (context) => doctordetailed(
                              hid: doctors[index]["hospitalID"],
                              did: doctors[index]["docID"],
                              email: doctors[index]["email"],
                              fullname: doctors[index]["fullname"],
                              phone: doctors[index]["phone"],
                              speciality: doctors[index]["speciality"]),
                        ))
                      },
                      child: Container(
                        width:
                            150.0, // Set a fixed width for each item (adjust as needed)
                        margin: const EdgeInsets.only(right: 5.0, left: 5.0),
                        decoration: BoxDecoration(
                          // color: color,
                          gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                              // const Color.fromARGB(255, 21, 136, 231),
                              // const Color.fromARGB(255, 5, 48, 120),
                              color,
                              color1,
                              // color1,

                              Colors.black
                            ],
                          ),
                          borderRadius: BorderRadius.circular(
                              10.0), // Adjust the radius as needed
                          boxShadow: [
                            const BoxShadow(
                              color: Colors.grey, // Shadow color
                              offset: Offset(0, 3), // Offset of the shadow
                              blurRadius: 5.0, // Blur radius
                              spreadRadius: 0.0, // Spread radius
                            ),
                          ],
                        ),
                        child: Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.end,
                            children: [
                              Text(
                                doctors[index]["fullname"],
                                style: const TextStyle(
                                    fontSize: 20.0, color: Colors.white),
                              ),
                              Text(
                                doctors[index]["speciality"],
                                style: const TextStyle(
                                    fontSize: 15.0, color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // Container(
            //   height: 100.0, // Set a fixed height for the Container
            //   margin: EdgeInsets.only(
            //       left: 5.0, right: 5.0, top: 5.0, bottom: 10.0),

            //   child: ListView.builder(
            //     scrollDirection: Axis.horizontal, // Scroll horizontally
            //     itemCount: docs.length,
            //     itemBuilder: (BuildContext context, int index) {
            //       final color = boxColors[index % boxColors.length];
            //       return Container(
            //         width:
            //             150.0, // Set a fixed width for each item (adjust as needed)
            //         margin: EdgeInsets.only(right: 5.0, left: 5.0),
            //         decoration: BoxDecoration(
            //           color: color,
            //           borderRadius: BorderRadius.circular(
            //               10.0), // Adjust the radius as needed
            //           boxShadow: [
            //             BoxShadow(
            //               color: Colors.grey, // Shadow color
            //               offset: Offset(0, 3), // Offset of the shadow
            //               blurRadius: 5.0, // Blur radius
            //               spreadRadius: 0.0, // Spread radius
            //             ),
            //           ],
            //         ),
            //         child: Center(
            //           child: Text(
            //             docs[index],
            //             style: TextStyle(fontSize: 20.0),
            //           ),
            //         ),
            //       );
            //     },
            //   ),
            // ),

            Container(
              // margin: EdgeInsets.only(top: 10.0), // Adjust the height as needed
              padding: const EdgeInsets.only(top: 10),
              child: Align(
                alignment: Alignment.center,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment
                      .spaceEvenly, // Center the icons horizontally
                  children: [
                    IconButton(
                      icon: const Icon(
                        Icons.home,
                        size: 25.0,
                      ),
                      onPressed: () {
                        // Handle the Home icon press
                      },
                    ),
                    IconButton(
                      icon: const Icon(
                        Icons.notifications,
                        size: 25.0,
                      ),
                      onPressed: () {
                        // Handle the Notification icon press
                      },
                    ),
                    IconButton(
                      icon: const Icon(
                        Icons.scanner,
                        size: 25.0,
                      ),
                      onPressed: () {
                        // Handle the Notification icon press
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const uprof()),
                        );
                      },
                    ),
                    IconButton(
                      icon: const Icon(
                        Icons.add,
                        size: 25.0,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const prescription()),
                        );
                      },
                    ),
                    IconButton(
                      icon: const Icon(
                        Icons.note,
                        size: 25.0,
                      ),
                      onPressed: () {
                        // Handle the Notepad icon press
                      },
                    ),
                  ],
                ),
              ),
            ),

            // Add more children as needed
            const SizedBox(
              height: 1.0,
            )
          ],
        ),
      ),
    );
  }
}
