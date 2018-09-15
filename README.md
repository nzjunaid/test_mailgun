First install dependencies using the command 
	```npm install```

For running the test use the command 
	```npm test```

Run the server using the command 
	```node server.js```
	
	



For Post Api which is used for inseting values to the file,give a post request to 'localhost:8080/' with ' name ' , ' email ' and ' dateofbirth parameters ' in json format . It is in form urlencoded format . 
An example for the insert would be

```
 curl -d "name=junaid&email=junaidnz97@gmail.com&dateofbirth=1997-09-16" -X POST http://localhost:8080
```

For the above given api, all invalid entries ( invalid name , invalid email , age>120 , age<16 ) will be rejected . Even though date of birth is optional ( date of birth can be null ) , invalid date of births are not allowed i.e age>120 and age<16 is not allowed .


	



For Get Api which is used for retrieving all the contents from the file , give  a get request to " localhost:8080/allcontent " 

An example for getting all 

```
	curl -XGET localhost:8080/allcontent 
```
The above api , retrieves all the contents from the file.






For Get Api which is used to retreive the latest end point from the file , give  a get request to " localhost:8080/getlatestendpoint " 

An example Api for this would be
```

	curl -XGET localhost:8080/getlatestendpoint 

```
The above api retrieves the last entry of the file .






For  Get Api which is used to get the xth content from the file , give  a get request to " localhost:8080/getxthcontent?x=3 " with any integer value of x as a parameter . 

```

	curl -XGET localhost:8080/getxthcontent?x=3

```

The above api retrives the xth entry from the file .