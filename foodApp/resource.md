# COOKIE

https://www.kaspersky.com/resource-center/definitions/cookies

# TOKENS AND COOKIES:  (Img upload on image folder)

Cache : 

backend   ------ Frontend (suppose browser ne request(login -> email , password) krri backend ne response bhja kuch)
and again jab hum Feeds scroll krege toh vo kisi particular user ko show honi chaiye toh again request marege. Jab scroll krega tb again request lgegi
or dekhega ki yeh login hai ya nahi because HTTP is stateless. soo baar baar clogin krna pdhta hai so overcome from this we use 
COOKIES.

# HOW COOKIES WORK: we send the request to the server, and the server send the response via cookies. and yeh Frontend par cookies store hojegi
and next time jb request bhjte hai tb request me cookie jati hai

jab Frontend wala person yeh cookie lekr aata hai toh yeh match krta hai ki backend me jo cookie hai aur Frontend se cookie aayi hai agar same hai toh loggin krdo

# When we log out from the device, the browser cookie destroy

==================================================

# what is the need of the Cookies?
sol ) because HttP is stateless means :
1) 1st time Req,res jab aajata hai
2) agar jab dubara request lgti hai eg jb scroll kro feed toh dubara request jati hai 
or yeh bhul jata hai ki phle koi request ya response aaya tha to yeh dubara login krta hai

HTTP -> header(MetaType isme Store krwa lete hai hum cookies)