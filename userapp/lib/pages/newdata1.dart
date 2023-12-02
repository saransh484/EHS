import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:intl/intl.dart';

class NewData1 extends StatefulWidget {
  @override
  State<NewData1> createState() => _NewData1State();
}

class _NewData1State extends State<NewData1> {
  late String op;
  late String selectedFileName = ""; // Initially empty
  late String title = ""; // Initially empty
  late String symptoms = ""; // Initially empty
  late DateTime selectedDate = DateTime.now(); // Initially current date

  // Replace the API endpoint URL with your actual endpoint

  Future<String?> getEhsidFromLocalStorage() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    String? ehsid = prefs.getString('ehsid');
    setState(() {
      op = ehsid ?? "";
    });
    return ehsid;
  }

  Future<void> _selectFile(BuildContext context) async {
    print("selectinng file ");
    FilePickerResult? result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['pdf'],
    );

    if (result != null) {
      setState(() {
        PlatformFile file = result.files.first;
        selectedFileName = file.name ?? ""; // Update the selected file name
        print(selectedFileName);
      });
    }
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: selectedDate,
      firstDate: DateTime(2015, 8),
      lastDate: DateTime(2101),
    );
    if (picked != null && picked != selectedDate) {
      setState(() {
        selectedDate = picked;
      });
    }
    String formattedDate = DateFormat.yMMMMd().format(selectedDate);
    print('Selected date: $formattedDate');
  }

  Future<void> postData() async {
    var url = Uri.parse('https://ehs-q3hx.onrender.com/addReport/${op}');
    var request = http.MultipartRequest('POST', url);
    request.fields['title'] = title;
    request.fields['date'] = DateFormat.yMMMMd().format(selectedDate);
    request.fields['symptoms'] = symptoms;

    // Add file if selected
    if (selectedFileName.isNotEmpty) {
      // Use try-catch to handle exceptions when accessing file bytes
      try {
        FilePickerResult? result = await FilePicker.platform.pickFiles(
          type: FileType.custom,
          allowedExtensions: ['pdf'],
        );
        print("try file ");
        if (result != null) {
          PlatformFile file = result.files.first;
          request.files.add(http.MultipartFile.fromBytes(
            'pdf',
            file.bytes!,
            filename: file.name,
          ));
          print("REquest :  $request");
        }
      } catch (error) {
        print('Error selecting file: $error');
      }
    }

    try {
      var response = await request.send();
      print(response);
      if (response.statusCode == 200) {
        print('File uploaded successfully');
      } else {
        print('File upload failed with status ${response.statusCode}');
      }
    } catch (error) {
      print('Error uploading file: $error');
    }

    // Show Appointment Booked dialog after postData function execution
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('Appointment Booked'),
          content: Text('Your appointment has been successfully booked.'),
          actions: <Widget>[
            ElevatedButton(
              onPressed: () {
                // Navigator.of(context).pop();
              },
              child: Text('Close'),
            ),
          ],
        );
      },
    );
  }

  @override
  void initState() {
    super.initState();
    getEhsidFromLocalStorage();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              IconButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                icon: Icon(Icons.arrow_back, size: 38),
              ),
              Text(
                'New Data',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20.0),
              ),
              SizedBox(height: 20),
              TextField(
                decoration: InputDecoration(
                  labelText: 'Enter Disease',
                  border: OutlineInputBorder(),
                ),
                onChanged: (text) {
                  title = text;
                },
              ),
              SizedBox(height: 20),
              TextField(
                decoration: InputDecoration(
                  labelText: 'Add Symptoms',
                  border: OutlineInputBorder(),
                ),
                onChanged: (text) {
                  symptoms = text;
                },
              ),
              SizedBox(height: 20),
              GestureDetector(
                onTap: () {
                  _selectFile(context);
                },
                child: Container(
                  padding: EdgeInsets.all(10.0),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.black),
                  ),
                  child: Text(selectedFileName.isNotEmpty
                      ? selectedFileName
                      : 'Choose File'),
                ),
              ),
              SizedBox(height: 20),
              Row(
                children: [
                  Text('Choose Date: '),
                  TextButton(
                    onPressed: () {
                      _selectDate(context);
                    },
                    child: Text(
                      DateFormat.yMMMMd().format(selectedDate),
                      style: TextStyle(color: Colors.blue),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: () async {
                  await postData();
                },
                child: Text('Add Health History'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
