# GRN.GG

League of Legends Statistics Website with Quick Summoner Search.

Backend: MySQL, ExpressJS with Node, Ubuntu
FrontEnd: React

Developed recursive match record statistics scraper, by using the following logic

1. Retrieve profile of any user who searched their usename
2. Retrieve 20 most recent match record from the profile
3. Display match record, and store userid of 10 users from each match (10 \* 20 = 200 new users added everytime)
4. Repeat from 1, without displaying match record in the backend to collect more statistics

As a developer, I:

1. Developed entire scraping backend logic using MySQL and Node and APIs from Garena.
2. Developed entire front-end design to display LoL champion ranking, and player match record with many game details including kills, deaths, assists, teammates, gametime, items, etc.
