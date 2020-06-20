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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,'très intéressant!','2020-06-20 21:16:18','2020-06-20 21:16:18',1,2),(2,'framework génial, merci','2020-06-20 21:17:09','2020-06-20 21:17:09',4,2),(3,'nice post!','2020-06-20 21:17:39','2020-06-20 21:17:39',5,2),(4,'excelent','2020-06-20 21:18:47','2020-06-20 21:18:47',4,3),(5,'belle photo !','2020-06-20 21:19:05','2020-06-20 21:19:05',1,3),(6,'awesome','2020-06-20 21:19:24','2020-06-20 21:19:24',5,3),(7,'quelle version?','2020-06-20 21:20:02','2020-06-20 21:20:02',7,3),(8,'ok','2020-06-20 21:20:50','2020-06-20 21:20:50',6,3),(9,'très important!','2020-06-20 21:26:22','2020-06-20 21:26:22',8,1),(10,'merci','2020-06-20 21:26:32','2020-06-20 21:26:32',8,1),(11,'v4?','2020-06-20 21:26:44','2020-06-20 21:26:44',7,1),(12,'c\'est noté','2020-06-20 21:27:06','2020-06-20 21:27:06',6,1),(13,'good','2020-06-20 21:27:16','2020-06-20 21:27:16',5,1),(14,'et react?','2020-06-20 21:27:39','2020-06-20 21:27:39',4,1),(15,'merci merci!','2020-06-20 21:27:54','2020-06-20 21:27:54',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (1,'Informations sur mars','Mars est la quatrième planète par ordre de distance croissante au Soleil et la deuxième par masse et par taille croissantes. Son éloignement au Soleil est compris entre 1,381 et 1,666 UA, avec une période orbitale de 669,58 jours martiens.','http://localhost:3000/images/mars.jpg1592687269588.jpg','2020-06-20 21:07:49','2020-06-20 21:07:49',1),(4,'vuejs','Vue.js, est un framework JavaScript open-source utilisé pour construire des interfaces utilisateur et des applications web monopages. Vue a été créé par Evan You et est maintenu par lui et le reste des membres actifs de l\'équipe principale travaillant sur le projet et son écosystème.',NULL,'2020-06-20 21:09:11','2020-06-20 21:09:11',1),(5,'Ux design','User experience design (UXD, UED, or XD) is the process of manipulating user behavior[1] through usability, usefulness, and desirability provided in the interaction with a product.[2] User experience design encompasses traditional human–computer interaction (HCI) design and extends it by addressing all aspects of a product or service as perceived by users. Experience design (XD) is the practice of designing products, processes, services, events, omnichannel journeys, and environments with a focus placed on the quality of the user experience and culturally relevant solutions.',NULL,'2020-06-20 21:11:16','2020-06-20 21:11:16',1),(6,'les méthodes agiles','Les méthodes agiles sont des groupes de pratiques de pilotage et de réalisation de projets. Elles ont pour origine le manifeste Agile, rédigé en 2001, qui consacre le terme d\'« agile » pour référencer de multiples méthodes existantes.',NULL,'2020-06-20 21:12:40','2020-06-20 21:12:40',2),(7,'Connaissez vous bootstrap?','Bootstrap est une collection d\'outils utiles à la création du design de sites et d\'applications web. C\'est un ensemble qui contient des codes HTML et CSS, des formulaires, boutons, outils de navigation et autres éléments interactifs, ainsi que des extensions JavaScript en option.','http://localhost:3000/images/bootstrap.jpg1592687747258.jpg','2020-06-20 21:15:47','2020-06-20 21:15:47',2),(8,'Javascript','JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives mais aussi pour les serveurs avec l\'utilisation de Node.js. ','http://localhost:3000/images/javascript.jpg1592688271669.jpg','2020-06-20 21:24:31','2020-06-20 21:24:31',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'admin','admin','admin@admin.com','$2b$10$Kf1NeONtSOPrtKDKE2KoreYpSVjr8kVA3rEBeEbtQTXtPMdg9RnDu',1,'2020-06-20 21:03:42','2020-06-20 21:03:42'),(2,'luc','dupond','luc@dupond.com','$2b$10$2EqFQKCStrqGCH78/zYLn.ePhyn/WSw4Ho30W4ZLtREzlMXAS86LC',0,'2020-06-20 21:12:11','2020-06-20 21:12:11'),(3,'olivier','dupond','olivier@dupond.com','$2b$10$FVLBCDYm5y2OjjbBOPAD4.6lt5P62iNWDrfUNzMXcZdavsHhxMvJO',0,'2020-06-20 21:18:27','2020-06-20 21:18:27');
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

-- Dump completed on 2020-06-20 23:32:27
