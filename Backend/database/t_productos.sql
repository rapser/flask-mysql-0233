/*
 Navicat Premium Data Transfer

 Source Server         : amazon-mysql
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : webinarcodigo.c16vf7d4zq8q.us-east-2.rds.amazonaws.com:3306
 Source Schema         : j6esing1lhmqk7kj

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 22/03/2021 21:56:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_productos
-- ----------------------------
DROP TABLE IF EXISTS `t_productos`;
CREATE TABLE `t_productos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `prod_nom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `prod_prec` double NOT NULL,
  `prod_disp` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
