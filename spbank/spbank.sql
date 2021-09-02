-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Sep 02, 2021 at 09:38 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `id16891946_spbank`
--

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `p_name` varchar(20) NOT NULL,
  `s_name` varchar(20) NOT NULL,
  `acc_no` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `current_bal` int(11) NOT NULL,
  `datetime` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `p_name`, `s_name`, `acc_no`, `amount`, `current_bal`, `datetime`) VALUES
(1, 'Keval Shah', 'Darshan', 10080085, -200, 7428, '2021-05-26 20:35:42'),
(2, 'Darshan', 'Keval Shah', 10080154, 200, 1600, '2021-05-26 20:35:42'),
(3, 'Keval Shah', 'Darshan', 10080085, -120, 7308, '2021-05-26 20:36:24'),
(4, 'Darshan', 'Keval Shah', 10080154, 120, 1720, '2021-05-26 20:36:24'),
(5, 'Darshan', 'Keval Shah', 10080154, -500, 1220, '2021-05-26 20:49:12'),
(6, 'Keval Shah', 'Darshan', 10080085, 500, 7808, '2021-05-26 20:49:12'),
(7, 'Rushil Shah', 'Keval Shah', 10080223, -200, 1281, '2021-05-26 20:53:13'),
(8, 'Keval Shah', 'Rushil Shah', 10080085, 200, 8008, '2021-05-26 20:53:13'),
(9, 'Keval Shah', 'Rushil Shah', 10080085, -10, 7998, '2021-05-27 12:58:04'),
(10, 'Rushil Shah', 'Keval Shah', 10080223, 10, 1291, '2021-05-27 12:58:04'),
(11, 'Keval Shah', 'Rushil Shah', 10080085, -10, 7988, '2021-05-27 12:58:17'),
(12, 'Rushil Shah', 'Keval Shah', 10080223, 10, 1301, '2021-05-27 12:58:17'),
(17, 'Keval Shah', 'Rushil Shah', 10080085, -20, 7880, '2021-05-27 14:10:26'),
(18, 'Rushil Shah', 'Keval Shah', 10080223, 20, 1409, '2021-05-27 14:10:26'),
(19, 'Keval Shah', 'Darshan', 10080085, -15, 7865, '2021-05-27 14:10:38'),
(20, 'Darshan', 'Keval Shah', 10080154, 15, 1235, '2021-05-27 14:10:38'),
(21, 'Keval Shah', 'Rushil Shah', 10080085, -10, 7855, '2021-06-01 15:54:52'),
(22, 'Rushil Shah', 'Keval Shah', 10080223, 10, 1419, '2021-06-01 15:54:52'),
(23, 'Keval Shah', 'Rushil Shah', 10080085, -89, 7766, '2021-06-01 15:55:01'),
(24, 'Rushil Shah', 'Keval Shah', 10080223, 89, 1508, '2021-06-01 15:55:01'),
(25, 'Amisha shah', 'Keval Shah', 10080430, -20, 980, '2021-06-01 17:09:06'),
(26, 'Keval Shah', 'Amisha shah', 10080085, 20, 7786, '2021-06-01 17:09:06'),
(27, 'Amisha shah', 'Rushil Shah', 10080430, -890, 90, '2021-06-01 17:12:19'),
(28, 'Rushil Shah', 'Amisha shah', 10080223, 890, 2398, '2021-06-01 17:12:19'),
(29, 'Vipul Shah', 'Keval Shah', 10080499, -30, 970, '2021-06-01 18:00:00'),
(30, 'Keval Shah', 'Vipul Shah', 10080085, 30, 7816, '2021-06-01 18:00:00'),
(31, 'Keval Shah', 'Rushil Shah', 10080085, -1200, 6616, '2021-06-01 20:44:21'),
(32, 'Rushil Shah', 'Keval Shah', 10080223, 1200, 3598, '2021-06-01 20:44:21'),
(33, 'Keval Shah', 'Rushil Shah', 10080085, -66, 6550, '2021-06-01 21:08:00'),
(34, 'Rushil Shah', 'Keval Shah', 10080223, 66, 3664, '2021-06-01 21:08:00'),
(35, 'Keval Shah', 'Darshan', 10080085, -720, 5830, '2021-06-01 21:09:08'),
(36, 'Darshan', 'Keval Shah', 10080154, 720, 1955, '2021-06-01 21:09:08'),
(37, 'Keval Shah', 'Darshan', 10080085, -70, 5760, '2021-06-01 21:11:49'),
(38, 'Darshan', 'Keval Shah', 10080154, 70, 2025, '2021-06-01 21:11:49'),
(39, 'Keval Shah', 'Rushil Shah', 10080085, -100, 5660, '2021-06-01 21:13:41'),
(40, 'Rushil Shah', 'Keval Shah', 10080223, 100, 3764, '2021-06-01 21:13:41'),
(41, 'Keval Shah', 'Rushil Shah', 10080085, -60, 5600, '2021-06-01 21:15:30'),
(42, 'Rushil Shah', 'Keval Shah', 10080223, 60, 3824, '2021-06-01 21:15:30'),
(43, 'Baa', 'Keval Shah', 10080568, -250, 750, '2021-06-01 21:36:08'),
(44, 'Keval Shah', 'Baa', 10080085, 250, 5850, '2021-06-01 21:36:08'),
(45, 'Jeet Patel', 'Keval Shah', 10080637, -100, 900, '2021-06-01 22:11:19'),
(46, 'Keval Shah', 'Jeet Patel', 10080085, 100, 5950, '2021-06-01 22:11:19'),
(47, 'Jeet Patel', 'Keval Shah', 10080637, -80, 820, '2021-06-01 22:14:41'),
(48, 'Keval Shah', 'Jeet Patel', 10080085, 80, 6030, '2021-06-01 22:14:41'),
(49, 'Aishwarya patel', 'Keval Shah', 10080706, -70, 930, '2021-06-02 08:12:55'),
(50, 'Keval Shah', 'Aishwarya patel', 10080085, 70, 6100, '2021-06-02 08:12:55'),
(53, 'Keval Shah', 'Rushil Shah', 10080085, -100, 6000, '2021-06-02 12:04:22'),
(54, 'Rushil Shah', 'Keval Shah', 10080223, 100, 3924, '2021-06-02 12:04:22'),
(55, 'Keval Shah', 'Rushil Shah', 10080085, -10, 5990, '2021-06-02 12:04:34'),
(56, 'Rushil Shah', 'Keval Shah', 10080223, 10, 3934, '2021-06-02 12:04:34'),
(59, 'Keval Shah', 'imshah', 10080085, -100, 5890, '2021-06-02 13:12:24'),
(60, 'imshah', 'Keval Shah', 10080292, 100, 1100, '2021-06-02 13:12:24'),
(61, 'Keval Shah', 'Darshan', 10080085, -1000, 4890, '2021-06-03 10:43:44'),
(62, 'Darshan', 'Keval Shah', 10080154, 1000, 3025, '2021-06-03 10:43:44'),
(63, 'Keval Shah', 'Rushil Shah', 10080085, -1, 4889, '2021-06-03 10:47:37'),
(64, 'Rushil Shah', 'Keval Shah', 10080223, 1, 3935, '2021-06-03 10:47:37'),
(65, 'Keval Shah', 'Rushil Shah', 10080085, -1, 4888, '2021-06-03 10:48:11'),
(66, 'Rushil Shah', 'Keval Shah', 10080223, 1, 3936, '2021-06-03 10:48:11'),
(67, 'Keval Shah', 'Rushil Shah', 10080085, -1, 4887, '2021-06-03 10:48:44'),
(68, 'Rushil Shah', 'Keval Shah', 10080223, 1, 3937, '2021-06-03 10:48:44'),
(69, 'Keval Shah', 'Rushil Shah', 10080085, -1, 4886, '2021-06-03 10:48:49'),
(70, 'Rushil Shah', 'Keval Shah', 10080223, 1, 3938, '2021-06-03 10:48:49'),
(71, 'Keval Shah', 'Aishwarya patel', 10080085, -18, 4868, '2021-06-03 10:50:59'),
(72, 'Aishwarya patel', 'Keval Shah', 10080706, 18, 948, '2021-06-03 10:50:59'),
(73, 'Keval Shah', 'Aishwarya patel', 10080085, -18, 4850, '2021-06-03 10:52:11'),
(74, 'Aishwarya patel', 'Keval Shah', 10080706, 18, 966, '2021-06-03 10:52:11'),
(75, 'Keval Shah', 'Aishwarya patel', 10080085, -18, 4832, '2021-06-03 10:52:18'),
(76, 'Aishwarya patel', 'Keval Shah', 10080706, 18, 984, '2021-06-03 10:52:18'),
(77, 'Keval Shah', 'Aishwarya patel', 10080085, -70, 4762, '2021-06-03 10:52:31'),
(78, 'Aishwarya patel', 'Keval Shah', 10080706, 70, 1054, '2021-06-03 10:52:31'),
(79, 'Keval Shah', 'Aishwarya patel', 10080085, -90, 4672, '2021-06-03 10:55:10'),
(80, 'Aishwarya patel', 'Keval Shah', 10080706, 90, 1144, '2021-06-03 10:55:10'),
(81, 'Keval Shah', 'Keval ', 10080085, -2, 4670, '2021-06-03 11:57:12'),
(82, 'Keval ', 'Keval Shah', 10080775, 2, 1002, '2021-06-03 11:57:12'),
(83, 'Keval Shah', 'Darshan Suthar', 10080085, -100, 4570, '2021-06-03 12:17:10'),
(84, 'Darshan Suthar', 'Keval Shah', 10080844, 100, 1100, '2021-06-03 12:17:10'),
(85, 'Keval Shah', 'Prerak+nandu', 10080085, -100, 4470, '2021-06-03 12:17:31'),
(86, 'Prerak+nandu', 'Keval Shah', 10080775, 100, 1102, '2021-06-03 12:17:31'),
(87, 'Vipul', 'Darshan Suthar', 10080913, -10, 990, '2021-06-03 14:02:48'),
(88, 'Darshan Suthar', 'Vipul', 10080844, 10, 1110, '2021-06-03 14:02:48'),
(89, 'Keval Shah', 'Ritul', 10080085, -26, 4444, '2021-06-03 16:04:13'),
(90, 'Ritul', 'Keval Shah', 10080361, 26, 1026, '2021-06-03 16:04:13'),
(91, 'Keval Shah', 'HARSHIL', 10080085, -55, 4389, '2021-06-03 17:20:46'),
(92, 'HARSHIL', 'Keval Shah', 10080982, 55, 1055, '2021-06-03 17:20:46'),
(93, 'HARSHIL', 'Keval Shah', 10080982, -55, 1000, '2021-06-03 17:21:43'),
(94, 'Keval Shah', 'HARSHIL', 10080085, 55, 4444, '2021-06-03 17:21:43'),
(97, 'Keval Shah', 'Ritul', 10080085, -44, 4400, '2021-06-04 05:55:58'),
(98, 'Ritul', 'Keval Shah', 10080361, 44, 1070, '2021-06-04 05:55:58'),
(99, 'Keval Shah', 'Darshan', 10080085, -30, 4370, '2021-06-04 05:57:46'),
(100, 'Darshan', 'Keval Shah', 10080154, 30, 3055, '2021-06-04 05:57:46'),
(101, 'Pathak Jay Satyend', 'Prerak+nandu', 10081120, -5, 995, '2021-06-05 06:12:33'),
(102, 'Prerak+nandu', 'Pathak Jay Satyend', 10080775, 5, 1107, '2021-06-05 06:12:33'),
(103, 'Pathak Jay Satyend', 'Keval Shah', 10081120, -10, 985, '2021-06-05 06:12:47'),
(104, 'Keval Shah', 'Pathak Jay Satyend', 10080085, 10, 4380, '2021-06-05 06:12:47'),
(105, 'Pathak Jay Satyend', 'Rushil Shah', 10081120, -10, 975, '2021-06-05 06:13:25'),
(106, 'Rushil Shah', 'Pathak Jay Satyend', 10080223, 10, 3948, '2021-06-05 06:13:25'),
(107, 'Pathak Jay Satyend', 'Rushil Shah', 10081189, -10, 990, '2021-06-05 06:14:44'),
(108, 'Rushil Shah', 'Pathak Jay Satyend', 10080223, 10, 3958, '2021-06-05 06:14:44'),
(109, 'Keval Shah', 'HARSHIL', 10080085, -70, 4310, '2021-06-07 05:49:42'),
(110, 'HARSHIL', 'Keval Shah', 10080982, 70, 1070, '2021-06-07 05:49:42'),
(111, 'Keval Shah', 'Darshan', 10080085, -110, 4200, '2021-06-07 05:50:20'),
(112, 'Darshan', 'Keval Shah', 10080154, 110, 3165, '2021-06-07 05:50:20'),
(113, 'Keval Shah', 'KKk', 10080085, -100, 4100, '2021-06-09 13:50:36'),
(114, 'KKk', 'Keval Shah', 10081258, 100, 1100, '2021-06-09 13:50:36'),
(115, 'Keval Shah', 'KKk', 10080085, -100, 4000, '2021-06-09 13:51:22'),
(116, 'KKk', 'Keval Shah', 10081258, 100, 1200, '2021-06-09 13:51:22'),
(117, 'Keval Shah', 'HARSHIL', 10080085, -61, 3939, '2021-06-12 17:52:17'),
(118, 'HARSHIL', 'Keval Shah', 10080982, 61, 1131, '2021-06-12 17:52:17'),
(119, 'Keval Shah', 'Rushil Shah', 10080085, -100, 3839, '2021-07-08 12:36:30'),
(120, 'Rushil Shah', 'Keval Shah', 10080223, 100, 4058, '2021-07-08 12:36:30'),
(121, 'Keval Shah', 'Amisha shah', 10080085, -71, 3769, '2021-07-09 16:44:27'),
(122, 'Amisha shah', 'Keval Shah', 10080430, 71, 161, '2021-07-09 16:44:27'),
(123, 'Keval Shah', 'Rushil Shah', 10080085, -10, 3759, '2021-07-09 16:44:50'),
(124, 'Rushil Shah', 'Keval Shah', 10080223, 10, 4068, '2021-07-09 16:44:50'),
(125, 'Keval Shah', 'Rushil', 10080085, -760, 2999, '2021-07-09 16:45:46'),
(126, 'Rushil', 'Keval Shah', 10081327, 760, 7760, '2021-07-09 16:45:46');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(18) NOT NULL,
  `acc_no` int(11) NOT NULL,
  `balance` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `acc_no`, `balance`) VALUES
(1, 'Keval Shah', 'skeval904@gmail.com', 'Keval904S', 10080085, 2999),
(2, 'Darshan', 'drshn@gml.cm', 'imdrsan.', 10080154, 3165),
(3, 'Rushil Shah', 'srushil63@gmail.com', 'RundiSissy', 10080223, 4068),
(4, 'imshah', 'imshah@gm.c', 'imshahshah', 10080292, 1100),
(5, 'Ritul', 'Ritul@patel.com', 'qwer1234', 10080361, 1070),
(7, 'Amisha shah', 'samisha931@gmail.com', '12345678', 10080430, 161),
(8, 'Vipul Shah', 'vipul.shah67@yahoo.com', 'keval2001', 10080499, 970),
(9, 'Baa', 'baa@gmail.com', 'i am baa', 10080568, 750),
(10, 'Jeet Patel', 'jeet@patel.com', 'jeet@patel', 10080637, 820),
(11, 'Aishwarya patel', 'aishwarya@patel.com', 'aishwarya@patel', 10080706, 1144),
(12, 'Prerak+nandu', 'keval1234@gmail.com', 'keval@12345', 10080775, 1107),
(13, 'Darshan Suthar', 'dsuthar999@gmail.com', '12345678', 10080844, 1110),
(14, 'Vipul', 'vipul.shah8787@gmail.com', 'keval200', 10080913, 990),
(15, 'HARSHIL', 'hmali483@gmail.com', '2018033800120827', 10080982, 1131),
(16, 'Keval Shah', 'keval@shah.com', 'Keval904S', 10081051, 1000),
(17, 'Pathak Jay Satyend', 'pathak0411@gmail.com', 'jjjjjjjjjjj', 10081120, 975),
(18, 'Pathak Jay Satyend', 'jaypathak0411@gmail.com', 'aaaaaaaaaa', 10081189, 990),
(19, 'KKk', 'abc@yaho.com', 'kkkkkkkk', 10081258, 1200),
(20, 'Rushil', 'pjack520@gmail.com', 'zxcvbnm,./', 10081327, 7760);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
