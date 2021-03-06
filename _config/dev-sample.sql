-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 29, 2019 at 04:38 PM
-- Server version: 5.7.28-0ubuntu0.18.04.4
-- PHP Version: 5.6.40-14+ubuntu18.04.1+deb.sury.org+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lilplaytime`
--

-- --------------------------------------------------------

--
-- Table structure for table `cpc_dates`
--

CREATE TABLE `cpc_dates` (
  `id` int(11) NOT NULL,
  `goal` varchar(25) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `template_id` int(11) DEFAULT '0',
  `detail` varchar(150) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cpc_dates`
--

INSERT INTO `cpc_dates` (`id`, `goal`, `date`, `template_id`, `detail`) VALUES
(90, '0', '2017-09-21 00:00:00', 3, '13'),
(91, '0', '2017-09-20 00:00:00', 3, '3'),
(92, '0', '2017-09-19 00:00:00', 3, '--'),
(93, '0', '2017-09-18 00:00:00', 3, '8'),
(94, '0', '2017-09-17 00:00:00', 3, '6x 1mi'),
(95, '0', '2017-09-16 00:00:00', 3, '4'),
(96, '0', '2017-09-15 00:00:00', 3, '--'),
(97, '0', '2017-09-14 00:00:00', 3, '12'),
(98, '0', '2017-09-13 00:00:00', 3, '3'),
(99, '0', '2017-09-12 00:00:00', 3, '--'),
(100, '0', '2017-09-11 00:00:00', 3, '7'),
(101, '0', '2017-09-10 00:00:00', 3, '10x .5'),
(102, '0', '2017-09-09 00:00:00', 3, '5'),
(103, '0', '2017-09-08 00:00:00', 3, '--'),
(104, '0', '2017-09-07 00:00:00', 3, '11'),
(105, '0', '2017-09-06 00:00:00', 3, '3'),
(106, '0', '2017-09-05 00:00:00', 3, '--'),
(107, '0', '2017-09-04 00:00:00', 3, '8'),
(108, '0', '2017-09-03 00:00:00', 3, '5x 1mi'),
(109, '0', '2017-09-02 00:00:00', 3, '5'),
(110, '0', '2017-09-01 00:00:00', 3, '--'),
(111, '0', '2017-08-31 00:00:00', 3, '10'),
(112, '0', '2017-08-30 00:00:00', 3, '3'),
(113, '0', '2017-08-29 00:00:00', 3, '--'),
(114, '0', '2017-08-28 00:00:00', 3, '7'),
(115, '0', '2017-08-27 00:00:00', 3, '10x .5'),
(116, '0', '2017-08-26 00:00:00', 3, '4'),
(117, '0', '2017-08-25 00:00:00', 3, '--'),
(118, '0', '2017-08-24 00:00:00', 3, '9'),
(119, '0', '2017-08-23 00:00:00', 3, '3'),
(120, '0', '2017-08-22 00:00:00', 3, '--'),
(121, '0', '2017-08-21 00:00:00', 3, '7'),
(122, '0', '2017-08-20 00:00:00', 3, '4x 1mi'),
(123, '0', '2017-08-19 00:00:00', 3, '5'),
(124, '0', '2017-08-18 00:00:00', 3, '--'),
(125, '0', '2017-08-17 00:00:00', 3, '8'),
(126, '0', '2017-08-16 00:00:00', 3, '3'),
(127, '0', '2017-08-15 00:00:00', 3, '--'),
(128, '0', '2017-08-14 00:00:00', 3, '6'),
(129, '0', '2017-08-13 00:00:00', 3, '10x .5'),
(130, '0', '2017-08-12 00:00:00', 3, '4'),
(131, '0', '2017-08-11 00:00:00', 3, '--'),
(132, '0', '2017-08-10 00:00:00', 3, '7'),
(133, '0', '2017-08-09 00:00:00', 3, '3'),
(134, '0', '2017-08-08 00:00:00', 3, '--'),
(135, '0', '2017-08-07 00:00:00', 3, '7'),
(136, '0', '2017-08-06 00:00:00', 3, '5x 1mi'),
(137, '0', '2017-08-05 00:00:00', 3, '4'),
(138, '0', '2017-08-04 00:00:00', 3, '--'),
(139, '0', '2017-08-03 00:00:00', 3, '6'),
(140, '0', '2017-08-02 00:00:00', 3, '3'),
(141, '0', '2017-08-01 00:00:00', 3, '--'),
(142, '0', '2017-07-31 00:00:00', 3, '5'),
(143, '0', '2017-07-30 00:00:00', 3, '10x .5'),
(144, '0', '2017-07-29 00:00:00', 3, '5'),
(145, '0', '2017-07-28 00:00:00', 3, '--'),
(146, '0', '2017-07-27 00:00:00', 3, '5'),
(147, '0', '2017-07-26 00:00:00', 3, '3'),
(148, '0', '2017-07-25 00:00:00', 3, '--'),
(149, '0', '2017-07-24 00:00:00', 3, '6'),
(150, '0', '2017-07-23 00:00:00', 3, '4x 1mi'),
(151, '0', '2017-07-22 00:00:00', 3, '4'),
(152, '0', '2017-07-21 00:00:00', 3, '--'),
(153, '0', '2017-07-20 00:00:00', 3, '4'),
(154, '0', '2017-07-19 00:00:00', 3, '3'),
(155, '0', '2017-07-18 00:00:00', 3, '--'),
(156, '0', '2017-07-17 00:00:00', 3, '5'),
(157, '0', '2017-07-16 00:00:00', 3, '10x .5'),
(158, '0', '2017-07-15 00:00:00', 3, '4'),
(159, '0', '2017-07-14 00:00:00', 3, '--'),
(160, '0', '2017-07-13 00:00:00', 3, '3'),
(170, '0', '2017-08-18 00:00:00', 4, 'Bodybuilder Burnouts '),
(171, '0', '2017-08-16 00:00:00', 4, 'Shrednado'),
(172, '0', '2017-08-14 00:00:00', 4, 'Calorie crunching Combos'),
(173, '0', '2017-08-11 00:00:00', 4, '5 minute Death Sets'),
(174, '0', '2017-08-09 00:00:00', 4, 'Thermgenic Tempo Training'),
(175, '0', '2017-08-07 00:00:00', 4, 'Lightweight Leanout'),
(176, '0', '2017-08-04 00:00:00', 4, 'Density Doomsday'),
(177, '0', '2017-08-02 00:00:00', 4, 'Metaconda'),
(178, '0', '2017-07-31 00:00:00', 4, 'Six-Pack Superset');

-- --------------------------------------------------------

--
-- Table structure for table `cpc_logs`
--

CREATE TABLE `cpc_logs` (
  `id` int(11) NOT NULL,
  `goal` varchar(25) NOT NULL DEFAULT '0',
  `points` int(5) DEFAULT '0',
  `date` date DEFAULT '0000-00-00',
  `count` float DEFAULT '0',
  `comment` varchar(128) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cpc_logs`
--

INSERT INTO `cpc_logs` (`id`, `goal`, `points`, `date`, `count`, `comment`) VALUES
(8, 'pushups', 1, '2017-08-08', 40, ''),
(9, 'weight', 1, '0000-00-00', 145.2, 'fasting'),
(10, 'weight', 1, '0000-00-00', 145.2, 'fast'),
(11, 'weight', 1, '2017-08-08', 145.2, 'fast'),
(12, 'weight', 1, '2017-08-07', 146.2, 'big dinner'),
(13, 'weight', 1, '2019-11-29', 141, ''),
(14, 'weight', 1, '2019-11-27', 136, '');

-- --------------------------------------------------------

--
-- Table structure for table `cpc_plandates`
--

CREATE TABLE `cpc_plandates` (
  `id` int(11) NOT NULL,
  `template_id` int(11) NOT NULL,
  `content` varchar(128) NOT NULL,
  `days_from_target` int(2) DEFAULT NULL,
  `lastUpdated` datetime DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `cpc_plandates`
--

INSERT INTO `cpc_plandates` (`id`, `template_id`, `content`, `days_from_target`, `lastUpdated`) VALUES
(3, 1, '', 63, NULL),
(4, 1, '', 62, NULL),
(5, 1, '', 61, NULL),
(6, 1, '', 60, NULL),
(7, 1, '', 59, NULL),
(8, 1, '', 58, NULL),
(9, 1, '143.5', 57, NULL),
(10, 1, '', 56, NULL),
(11, 1, '', 55, NULL),
(12, 1, '', 54, NULL),
(13, 1, '', 53, NULL),
(14, 1, '', 52, NULL),
(15, 1, '', 51, NULL),
(16, 1, '143', 50, NULL),
(17, 1, '', 49, NULL),
(18, 1, '', 48, NULL),
(19, 1, '', 47, NULL),
(20, 1, '', 46, NULL),
(21, 1, '', 45, NULL),
(22, 1, '', 44, NULL),
(23, 1, '142.5', 43, NULL),
(24, 1, '', 42, NULL),
(25, 1, '', 41, NULL),
(26, 1, '', 40, NULL),
(27, 1, '', 39, NULL),
(28, 1, '', 38, NULL),
(29, 1, '', 37, NULL),
(30, 1, '142', 36, NULL),
(31, 1, '', 35, NULL),
(32, 1, '', 34, NULL),
(33, 1, '', 33, NULL),
(34, 1, '', 32, NULL),
(35, 1, '', 31, NULL),
(36, 1, '', 30, NULL),
(37, 1, '141.5', 29, NULL),
(38, 1, '', 28, NULL),
(39, 1, '', 27, NULL),
(40, 1, '', 26, NULL),
(41, 1, '', 25, NULL),
(42, 1, '', 24, NULL),
(43, 1, '', 23, NULL),
(44, 1, '141', 22, NULL),
(45, 1, '', 21, NULL),
(46, 1, '', 20, NULL),
(47, 1, '', 19, NULL),
(48, 1, '', 18, NULL),
(49, 1, '', 17, NULL),
(50, 1, '', 16, NULL),
(51, 1, '140.5', 15, NULL),
(52, 1, '', 14, NULL),
(53, 1, '', 13, NULL),
(54, 1, '', 12, NULL),
(55, 1, '', 11, NULL),
(56, 1, '', 10, NULL),
(57, 1, '', 9, NULL),
(58, 1, '140', 8, NULL),
(59, 1, '', 7, NULL),
(60, 1, '', 6, NULL),
(61, 1, '', 5, NULL),
(62, 1, '', 4, NULL),
(63, 1, '', 3, NULL),
(64, 1, '', 2, NULL),
(65, 1, '', 1, NULL),
(66, 1, '', 0, NULL),
(67, 2, '5 handstands', 56, NULL),
(68, 2, '10 pike pups', 55, NULL),
(69, 2, '5 handstands', 54, NULL),
(70, 2, '', 53, NULL),
(71, 2, '5 handstands', 52, NULL),
(72, 2, '10 pike pups', 51, NULL),
(73, 2, '', 50, NULL),
(74, 2, '1 HS pushups', 49, NULL),
(75, 2, '', 48, NULL),
(76, 2, '5 handstands', 47, NULL),
(77, 2, '10 pike pups', 46, NULL),
(78, 2, '5 handstands', 45, NULL),
(79, 2, '10 pike pups', 44, NULL),
(80, 2, '', 43, NULL),
(81, 2, '2 HS pushups', 42, NULL),
(82, 2, '', 41, NULL),
(83, 2, '5 handstands', 40, NULL),
(84, 2, '10 pike pups', 39, NULL),
(85, 2, '5 handstands', 38, NULL),
(86, 2, '10 pike pups', 37, NULL),
(87, 2, '', 36, NULL),
(88, 2, '3 HS pushups', 35, NULL),
(89, 2, '', 34, NULL),
(90, 2, '5 handstands', 33, NULL),
(91, 2, '10 pike pups', 32, NULL),
(92, 2, '5 handstands', 31, NULL),
(93, 2, '10 pike pups', 30, NULL),
(94, 2, '', 29, NULL),
(95, 2, '4 HS pushups', 28, NULL),
(96, 2, '', 27, NULL),
(97, 2, '5 handstands', 26, NULL),
(98, 2, '10 pike pups', 25, NULL),
(99, 2, '5 handstands', 24, NULL),
(100, 2, '10 pike pups', 23, NULL),
(101, 2, '', 22, NULL),
(102, 2, '6 HS pushups', 21, NULL),
(103, 2, '', 20, NULL),
(104, 2, '5 handstands', 19, NULL),
(105, 2, '10 pike pups', 18, NULL),
(106, 2, '5 handstands', 17, NULL),
(107, 2, '10 pike pups', 16, NULL),
(108, 2, '', 15, NULL),
(109, 2, '8 HS pushups', 14, NULL),
(110, 2, '', 13, NULL),
(111, 2, '5 handstands', 12, NULL),
(112, 2, '10 pike pups', 11, NULL),
(113, 2, '5 handstands', 10, NULL),
(114, 2, '10 pike pups', 9, NULL),
(115, 2, '', 8, NULL),
(116, 2, '8 HS pushups', 7, NULL),
(117, 2, '', 6, NULL),
(118, 2, '5 handstands', 5, NULL),
(119, 2, '10 pike pups', 4, NULL),
(120, 2, '9 HS pushups', 3, NULL),
(121, 2, '10 pike pups', 2, NULL),
(122, 2, '10 HS pushups', 1, NULL),
(123, 2, '', 0, NULL),
(124, 3, '3', 70, NULL),
(125, 3, '--', 69, NULL),
(126, 3, '4', 68, NULL),
(127, 3, '10x .5', 67, NULL),
(128, 3, '5', 66, NULL),
(129, 3, '--', 65, NULL),
(130, 3, '3', 64, NULL),
(131, 3, '4', 63, NULL),
(132, 3, '--', 62, NULL),
(133, 3, '4', 61, NULL),
(134, 3, '4x 1mi', 60, NULL),
(135, 3, '6', 59, NULL),
(136, 3, '--', 58, NULL),
(137, 3, '3', 57, NULL),
(138, 3, '5', 56, NULL),
(139, 3, '--', 55, NULL),
(140, 3, '5', 54, NULL),
(141, 3, '10x .5', 53, NULL),
(142, 3, '5', 52, NULL),
(143, 3, '--', 51, NULL),
(144, 3, '3', 50, NULL),
(145, 3, '6', 49, NULL),
(146, 3, '--', 48, NULL),
(147, 3, '4', 47, NULL),
(148, 3, '5x 1mi', 46, NULL),
(149, 3, '7', 45, NULL),
(150, 3, '--', 44, NULL),
(151, 3, '3', 43, NULL),
(152, 3, '7', 42, NULL),
(153, 3, '--', 41, NULL),
(154, 3, '4', 40, NULL),
(155, 3, '10x .5', 39, NULL),
(156, 3, '6', 38, NULL),
(157, 3, '--', 37, NULL),
(158, 3, '3', 36, NULL),
(159, 3, '8', 35, NULL),
(160, 3, '--', 34, NULL),
(161, 3, '5', 33, NULL),
(162, 3, '4x 1mi', 32, NULL),
(163, 3, '7', 31, NULL),
(164, 3, '--', 30, NULL),
(165, 3, '3', 29, NULL),
(166, 3, '9', 28, NULL),
(167, 3, '--', 27, NULL),
(168, 3, '4', 26, NULL),
(169, 3, '10x .5', 25, NULL),
(170, 3, '7', 24, NULL),
(171, 3, '--', 23, NULL),
(172, 3, '3', 22, NULL),
(173, 3, '10', 21, NULL),
(174, 3, '--', 20, NULL),
(175, 3, '5', 19, NULL),
(176, 3, '5x 1mi', 18, NULL),
(177, 3, '8', 17, NULL),
(178, 3, '--', 16, NULL),
(179, 3, '3', 15, NULL),
(180, 3, '11', 14, NULL),
(181, 3, '--', 13, NULL),
(182, 3, '5', 12, NULL),
(183, 3, '10x .5', 11, NULL),
(184, 3, '7', 10, NULL),
(185, 3, '--', 9, NULL),
(186, 3, '3', 8, NULL),
(187, 3, '12', 7, NULL),
(188, 3, '--', 6, NULL),
(189, 3, '4', 5, NULL),
(190, 3, '6x 1mi', 4, NULL),
(191, 3, '8', 3, NULL),
(192, 3, '--', 2, NULL),
(193, 3, '3', 1, NULL),
(194, 3, '13', 0, NULL),
(195, 4, 'Six-Pack Superset', 21, NULL),
(196, 4, '', 20, NULL),
(197, 4, 'Metaconda', 19, NULL),
(198, 4, '', 18, NULL),
(199, 4, 'Density Doomsday', 17, NULL),
(200, 4, '', 16, NULL),
(201, 4, '', 15, NULL),
(202, 4, 'Lightweight Leanout', 14, NULL),
(203, 4, '', 13, NULL),
(204, 4, 'Thermgenic Tempo Training', 12, NULL),
(205, 4, '', 11, NULL),
(206, 4, '5 minute Death Sets', 10, NULL),
(207, 4, '', 9, NULL),
(208, 4, '', 8, NULL),
(209, 4, 'Calorie crunching Combos', 7, NULL),
(210, 4, '', 6, NULL),
(211, 4, 'Shrednado', 5, NULL),
(212, 4, '', 4, NULL),
(213, 4, 'Bodybuilder Burnouts ', 3, NULL),
(214, 4, '', 2, NULL),
(215, 4, '', 1, NULL),
(216, 4, '', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `cpc_templates`
--

CREATE TABLE `cpc_templates` (
  `id` int(11) NOT NULL,
  `description` text COLLATE latin1_general_ci NOT NULL,
  `weeks_duration` int(2) NOT NULL,
  `include_milestones` int(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `cpc_templates`
--

INSERT INTO `cpc_templates` (`id`, `description`, `weeks_duration`, `include_milestones`) VALUES
(1, 'weight goals', 9, 0),
(2, 'pushups', 8, 0),
(3, '10wk-half marathon', 10, 0),
(4, 'metashred', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `cpc_tracks`
--

CREATE TABLE `cpc_tracks` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `type` varchar(10) DEFAULT NULL,
  `shortcode` varchar(10) DEFAULT NULL,
  `is_disabled` tinyint(1) DEFAULT '0',
  `points` tinyint(4) DEFAULT NULL,
  `is_archived` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='latin1_swedish_ci';

--
-- Dumping data for table `cpc_tracks`
--

INSERT INTO `cpc_tracks` (`id`, `name`, `type`, `shortcode`, `is_disabled`, `points`, `is_archived`) VALUES
(1, 'pushups', 'count', 'pups', 0, 1, 0),
(2, 'pullups', 'count', 'pull', 0, 1, 0),
(3, 'breakfast', 'time', 'bkft', 0, 1, 0),
(4, 'sleepInKids', 'count', 'sleepkids', 0, -3, 0),
(5, 'testDis', 'count', 'dis', 1, 1, 0),
(13, 'weight', 'count', 'w', 0, 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cpc_dates`
--
ALTER TABLE `cpc_dates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cpc_logs`
--
ALTER TABLE `cpc_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cpc_plandates`
--
ALTER TABLE `cpc_plandates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cpc_templates`
--
ALTER TABLE `cpc_templates`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cpc_tracks`
--
ALTER TABLE `cpc_tracks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cpc_dates`
--
ALTER TABLE `cpc_dates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=179;
--
-- AUTO_INCREMENT for table `cpc_logs`
--
ALTER TABLE `cpc_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `cpc_plandates`
--
ALTER TABLE `cpc_plandates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=217;
--
-- AUTO_INCREMENT for table `cpc_templates`
--
ALTER TABLE `cpc_templates`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `cpc_tracks`
--
ALTER TABLE `cpc_tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
