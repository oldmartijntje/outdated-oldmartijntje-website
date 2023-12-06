Curl requests to the backend:
```cmd
curl -X POST -H "Content-Type: application/json" -d "{\"id\": 5}" https://oldmartijntje.000webhostapp.com/api/messages/getNewMessages.php

curl https://oldmartijntje.000webhostapp.com/api/ping/ping.php

curl -X GET https://oldmartijntje.000webhostapp.com/api/messages/message.php

curl -X POST -H "Content-Type: application/json" -d "{\"content\": \"test\", \"username\": \"test\"}" https://oldmartijntje.000webhostapp.com/api/messages/message.php
```