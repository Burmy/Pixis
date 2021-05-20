-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: photoappDB
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` longtext NOT NULL,
  `fk_authorid` int NOT NULL,
  `fk_postid` int NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `key_toposttable_idx` (`fk_postid`),
  KEY `key_tousertable_idx` (`fk_authorid`),
  CONSTRAINT `key_toposttable` FOREIGN KEY (`fk_postid`) REFERENCES `posts` (`id`),
  CONSTRAINT `key_tousertable` FOREIGN KEY (`fk_authorid`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (48,'Superman isn\'t real stupid.',36,14,'2021-05-18 15:41:46'),
(49,'Shush!! @Randy',35,14,'2021-05-18 16:02:42'),
(50,'Cringe Caption :)',35,15,'2021-05-18 16:03:23'),
(51,'Nice caption!',37,15,'2021-05-18 16:20:08'),
(52,'Nice pic!',39,16,'2021-05-18 16:33:04'),
(53,'Hey Beerus, Nice to meet you!',39,17,'2021-05-18 16:34:44'),
(54,'can I have some?',36,18,'2021-05-18 16:41:31'),
(55,'Again, cringe caption.',35,19,'2021-05-18 16:58:59'),
(56,'So cute!',37,17,'2021-05-19 11:59:20'),
(58,'So cute!',39,22,'2021-05-19 13:36:31'),
(59,'Hi Pluto :)',36,22,'2021-05-19 13:44:35'),
(60,'Hello pluto!',42,22,'2021-05-19 18:57:08');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (14,'#nature #fashion #sunny','Look! Up in the sky! It\'s a bird! It\'s a plane! It\'s Superman!','public/images/uploads/b6bc4095625b3935e61baad84dbec2a24e55724cf52b.jpeg','public/images/uploads/thumbnail-b6bc4095625b3935e61baad84dbec2a24e55724cf52b.jpeg',0,'2021-05-18 15:12:21',35),
(15,'#sunday #snow #trees #style','I don’t know where I’m going, but I’m on my way.','public/images/uploads/7b81092b3a7b7fdedd88d0025fc80a2d81a21d387b7e.jpeg','public/images/uploads/thumbnail-7b81092b3a7b7fdedd88d0025fc80a2d81a21d387b7e.jpeg',0,'2021-05-18 15:54:51',36),
(16,'#sun #happy #morning','Don’t be afraid of your shadow, it’s really just a constant reminder that there’s light all around you.','public/images/uploads/0f7ad05088d43de39e3d4164e51352712ce6ebcc0373.jpeg','public/images/uploads/thumbnail-0f7ad05088d43de39e3d4164e51352712ce6ebcc0373.jpeg',0,'2021-05-18 16:19:48',37),
(17,'#cute #cat #pet','Hey I am god of destruction Beerus, Nice to meowt u!','public/images/uploads/01239119bfc89a625bc30d45cd1560b88f460d89e640.jpeg','public/images/uploads/thumbnail-01239119bfc89a625bc30d45cd1560b88f460d89e640.jpeg',0,'2021-05-18 16:27:30',38),
(18,'#morning #coffee #happy #fashion','Today is one of those days that even my coffee needs a coffee.','public/images/uploads/709c069bbe14cd9a272a875efadd9db30cc05ac73570.jpeg','public/images/uploads/thumbnail-709c069bbe14cd9a272a875efadd9db30cc05ac73570.jpeg',0,'2021-05-18 16:32:23',39),
(19,'#nature #fashion #model #style','I prefer Sunday mornings to Saturday nights – and that’s what I want to be to someone.','public/images/uploads/a8177b7b1c146fb8567ac6b2a4755fb0cfa6f3a3c922.jpeg','public/images/uploads/thumbnail-a8177b7b1c146fb8567ac6b2a4755fb0cfa6f3a3c922.jpeg',0,'2021-05-18 16:40:54',36),
(22,'#dog #puppy #pet #cute','Just got a new puppy! Say hi to Pluto!','public/images/uploads/77d76ffe24acc6e3a6fe99688cca998dbb4e9aaf9058.jpeg','public/images/uploads/thumbnail-77d76ffe24acc6e3a6fe99688cca998dbb4e9aaf9058.jpeg',0,'2021-05-19 13:35:26',37),
(24,'#vacation #nature ','Had a great vacation!','public/images/uploads/e0c6d6d3ad4bd93a0e4ff83c55b8cdb221dfa2651e35.jpeg','public/images/uploads/thumbnail-e0c6d6d3ad4bd93a0e4ff83c55b8cdb221dfa2651e35.jpeg',0,'2021-05-19 18:56:29',42);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'linda','yeet@yeet.com','dsvvsavsd',0,0,'2021-04-26 20:59:42'),
(2,'john','yeefft@yeet.com','dsvvfdgfgdfgdsavsd',0,0,'2021-04-26 21:10:27'),
(35,'John Cena','Johncena@cantsee.com','$2b$15$noQpLrdsnmWwQprBc4D17uCpcfhw0Hl9Qs3B7krzyrvnBZZNwGYSG',0,0,'2021-05-18 10:05:37'),
(36,'Randy Orton','Randy@wwetest.com','$2b$15$ltPbBSPFpmywM1ujOPUc/ubS1AHH124durek75LfKZ9HNtvEZIJ4i',0,0,'2021-05-18 15:41:10'),
(37,'Zelda Hyrule','Zelda@link.com','$2b$15$91xh2smRYM2tQ9ThgUWaDO/SD55qLZD/MKUEoffOXGcbNAT1M5fn.',0,0,'2021-05-18 16:18:23'),
(38,'Lord Beerus','beerus@dbz.com','$2b$15$pVRB8YQNiQdaPwQggQog2eYNP57zLTgMfxHm1/wDSrQM1wleRrOZq',0,0,'2021-05-18 16:25:31'),
(39,'Lara Croft','Lara@tombraider.com','$2b$15$9C/b6Qc1yqIVP5KgUZiPhOkOMYnM0RwzQ/rJDJoI797t4Sy4uW4rG',0,0,'2021-05-18 16:30:46'),
(42,'Bruce Wayne','Wayne@batman.com','$2b$15$etSkU5tqK.ZyElF6c0YCjuRhg2yZOwdMF0pYFKZ4xLXKTl09QULM2',0,0,'2021-05-19 18:55:34');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-19 22:26:42
