First install dependencies using the command 
	```npm install```

For running the test use the command 
	```npm test```

Run the server using the command 

	```node server.js```

For Post Api('inserting values'),give a post request to 'localhost:8080/'with 'name','email' and 'dateofbirth parameters' in json format.(It is in urlencoded format)
An example for the insert would be

```
 curl -d "name=junaid&email=junaidnz97@gmail.com&dateofbirth=1997-09-16" -X POST http://localhost:8080
```
For the above given api,all invalid entries(name,invalid email,age>120,age<16 will be rejected),date of birth is optional,but invalid date of birth is not allowed

	

For Get Api('all content'),give  a get request to "localhost:8080/allcontent" 

```
	curl -XGET localhost:8080/allcontent 
```
The above api,retrieves all the contents from the file.



For Get Api('latest endpoint'),give  a get request to "localhost:8080/getlatestendpoint" 

```

	curl -XGET localhost:8080/getlatestendpoint 

```
The above api retrieves the last entry of the file.


For  Get Api('get xth content'),give  a get request to "localhost:8080/getxthcontent?x=3" with any integer value of x as a parameter. 

```

	curl -XGET localhost:8080/getxthcontent?x=3

```
The above api retrives the xth entry from the file.