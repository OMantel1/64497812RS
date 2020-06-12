-- MySQL dump 10.13  Distrib 8.0.16, for macos10.14 (x86_64)
--
-- Host: localhost    Database: grp1
-- ------------------------------------------------------
-- Server version	5.7.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int(11) DEFAULT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,'super article','2020-06-07 13:17:41','2020-06-07 13:17:41',1,4),(2,'incroyable article','2020-06-07 13:18:08','2020-06-07 13:18:08',2,4),(3,'merci','2020-06-07 13:18:19','2020-06-07 13:18:19',2,4),(5,'très interessant !','2020-06-07 13:20:07','2020-06-07 13:20:07',1,3),(8,'deuxieme commentaire vérifié','2020-06-10 20:25:43','2020-06-10 20:25:43',13,4),(13,'commentaire','2020-06-10 22:42:07','2020-06-10 22:42:07',16,9);
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `content` text,
  `url_image` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (1,'mars','Mars est la quatrième planète par ordre de distance croissante au Soleil et la deuxième par masse et par taille croissantes. Son éloignement au Soleil est compris entre 1,381 et 1,666 UA, avec une période orbitale de 669,58 jours martiens.','https://upload.wikimedia.org/wikipedia/commons/3/36/Mars_Valles_Marineris_EDIT.jpg','2020-06-07 13:12:17','2020-06-07 13:12:17',5),(2,'jupiter','Jupiter est une planète géante gazeuse. Il s\'agit de la plus grosse planète du Système solaire, plus volumineuse et massive que toutes les autres planètes réunies, et la cinquième planète par sa distance au Soleil.','https://fr.wikipedia.org/wiki/Jupiter_%28plan%C3%A8te%29#/media/Fichier:Jupiter.jpg','2020-06-07 13:14:47','2020-06-07 13:14:47',3),(3,'Fender','Fender Musical Instruments Corporation, nommé initialement Fender\'s Radio Service puis Fender Electric Instrument Manufacturing Company, est une société créée par Leo Fender aux États-Unis dans les années 1940.','','2020-06-07 13:16:31','2020-06-07 13:16:31',4),(4,'gibson','gibson Musical Instruments Corporation, nommé initialement Fender\'s Radio Service puis Fender Electric Instrument Manufacturing Company, est une société créée par Leo Fender aux États-Unis dans les années 1940.','','2020-06-09 09:59:42','2020-06-09 09:59:42',5),(5,'gibson','gibson Musical Instruments Corporation, nommé initialement Fender\'s Radio Service puis Fender Electric Instrument Manufacturing Company, est une société créée par Leo Fender aux États-Unis dans les années 1940.','','2020-06-09 10:01:07','2020-06-09 10:01:07',5),(6,'gibson','gibson Musical Instruments Corporation, nommé initialement Fender\'s Radio Service puis Fender Electric Instrument Manufacturing Company, est une société créée par Leo Fender aux États-Unis dans les années 1940.','','2020-06-09 10:01:53','2020-06-09 10:01:53',1),(11,'informations sur testla','Tesla, Inc., initialement appelé Tesla Motors jusqu\'au 1ᵉʳ février 2017, est un constructeur automobile de voitures électriques dont le siège social se situe à Palo Alto, en Californie, dans la Silicon Valley, aux États-Unis.',NULL,'2020-06-09 10:29:17','2020-06-09 10:29:17',7),(12,'informations ','Windows est au départ une interface graphique unifiée produite par Microsoft, qui est devenue ensuite une gamme de systèmes d’exploitation à part entière, principalement destinés aux ordinateurs compatibles PC.',NULL,'2020-06-09 10:32:43','2020-06-09 10:32:43',7),(13,'informations vue js','Vue.js, est un framework JavaScript open-source utilisé pour construire des interfaces utilisateur et des applications web monopages. Vue a été créé par Evan You et est maintenu par lui et le reste des membres actifs de l\'équipe principale travaillant sur le projet et son écosystème.',NULL,'2020-06-09 10:41:21','2020-06-09 10:41:21',7),(14,'nouveau titre','mon super nouveau titre',NULL,'2020-06-09 12:22:27','2020-06-09 12:22:27',7),(15,'nouveau titre','mon super nouveau titre',NULL,'2020-06-09 12:22:28','2020-06-09 12:22:28',7),(16,'Nouveau message','test de la redirection',NULL,'2020-06-10 20:29:42','2020-06-10 20:29:42',4),(17,'test refresh page','un test refresh page',NULL,'2020-06-11 08:23:36','2020-06-11 08:23:36',9),(18,'mlkqmflkqsmlkf','mqldkfmqdlkfmlqdkmflqk',NULL,'2020-06-11 08:27:49','2020-06-11 08:27:49',9),(19,'Premier post de l\'admin','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',NULL,'2020-06-11 15:15:39','2020-06-11 15:15:39',9),(20,'Premier post de l\'admin','It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',NULL,'2020-06-11 15:15:52','2020-06-11 15:15:52',9),(21,'autre post','autre poste',NULL,'2020-06-11 15:16:45','2020-06-11 15:16:45',9),(22,'almlkmalkfzmlk','amlkfmlaekfmlkaemfl',NULL,'2020-06-11 15:29:59','2020-06-11 15:29:59',9),(23,'poua','poua',NULL,'2020-06-11 15:30:51','2020-06-11 15:30:51',9),(24,'ert','ert',NULL,'2020-06-11 15:32:11','2020-06-11 15:32:11',9),(25,'banane','banane',NULL,'2020-06-11 15:34:04','2020-06-11 15:34:04',9),(26,'cake','cake',NULL,'2020-06-11 18:41:37','2020-06-11 18:41:37',9),(27,'blabla','blabla',NULL,'2020-06-11 18:55:51','2020-06-11 18:55:51',9),(28,'ananas','ananas',NULL,'2020-06-11 18:57:16','2020-06-11 18:57:16',9),(29,'new post','new post test',NULL,'2020-06-11 20:53:44','2020-06-11 20:53:44',9),(30,'new post','new post test',NULL,'2020-06-11 20:53:46','2020-06-11 20:53:46',9),(31,'lmsdkmflkqsdf','qsdmlfkqsmdlfkqsdf',NULL,'2020-06-11 20:57:13','2020-06-11 20:57:13',9),(32,'problem','probleme?','https://media.giphy.com/media/l1J9uLBPjqCVIM2GI/giphy.gif','2020-06-11 20:58:50','2020-06-11 20:58:50',9),(33,'problem','probleme?','https://media.giphy.com/media/l1J9uLBPjqCVIM2GI/giphy.gif','2020-06-11 20:58:53','2020-06-11 20:58:53',9),(34,NULL,NULL,NULL,'2020-06-11 20:59:13','2020-06-11 20:59:13',9),(35,NULL,NULL,NULL,'2020-06-11 20:59:32','2020-06-11 20:59:32',9),(36,'qsd','qsd',NULL,'2020-06-11 21:01:56','2020-06-11 21:01:56',9),(37,'aezaze','azeaze',NULL,'2020-06-11 21:34:36','2020-06-11 21:34:36',9),(38,'sdfsdf','sdfsdf',NULL,'2020-06-11 21:35:48','2020-06-11 21:35:48',9),(39,'mlkmlk','lkmlkmlk',NULL,'2020-06-11 21:35:58','2020-06-11 21:35:58',9),(40,'testesetest','testesetest',NULL,'2020-06-11 23:49:11','2020-06-11 23:49:11',9);
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` text,
  `lastname` text,
  `mail` text,
  `mdp` text,
  `admin` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'test','test','test@test.com','$2b$10$MAYwRjEtWr5lOVYZ.ecoT.AZ2a2wxblw4O9HHWBC0rXlIszYHrzAm',0,'2020-06-07 08:29:01','2020-06-07 08:29:01'),(3,'martin','dupond','martin@dupond.com','$2b$10$BScRWPFatXMb25MlT4fLeuRAJXFt6QJGm5Q/2LNp27rpCR1TvXWfe',0,'2020-06-07 13:07:06','2020-06-07 13:07:06'),(4,'luc','dupond','luc@dupond.com','$2b$10$Oh9w0FDM8L8Cq/D8A6wZkeimUUjwQzIi0YYP9hfnXYeUP6wyX3L/G',0,'2020-06-07 13:07:20','2020-06-07 13:07:20'),(5,'patrick','dupond','patrick@dupond.com','$2b$10$jAwQnoSn1C5jTANC.5jIZuaswUY7hI9ggqy2.m9ELdLvld0lveFA.',0,'2020-06-07 13:08:55','2020-06-07 13:08:55'),(6,'olivier','dupond','olivier@dupond.com','$2b$10$sKOAK21MdzK8As0Y7sUOBuQz4eYkanqqrJSqj1gh3Rg.PSMJfaH0.',0,'2020-06-08 22:23:27','2020-06-08 22:23:27'),(7,'jean','dupond','jean@dupond.com','$2b$10$WwwO/mTsbbBIxMRT7o1KbucDMpd4xMjtlbgrmOZW5r7amf0/JF32i',0,'2020-06-09 07:13:39','2020-06-09 07:13:39'),(8,'john','dupond','john@dupond.com','$2b$10$M20wVbXZc1Om9FWaKHwfZeZiYmkOocrPBYeXF1Phz90ng4303p1xi',0,'2020-06-09 07:16:15','2020-06-09 07:16:15'),(9,'admin','admin','admin@admin.com','$2b$10$4dEvE0v1LOJtAYJctBt1QOFwJkOzEbyQBRoLNrSiI3kJYMFd.nTQq',1,'2020-06-10 22:14:26','2020-06-10 22:14:26');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-12  9:34:22
