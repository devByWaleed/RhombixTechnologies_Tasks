-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 23, 2024 at 01:49 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `music_library`
--

-- --------------------------------------------------------

--
-- Table structure for table `music_tracks`
--

CREATE TABLE `music_tracks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `composer` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `audio_file` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` time NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `music_tracks`
--

INSERT INTO `music_tracks` (`id`, `title`, `composer`, `category`, `audio_file`, `image`, `created_at`) VALUES
(5, 'Time Of Our Lives', 'Chawki', 'Sports', '2022 FIFA World Cup - Time Of Our Lives.mp3', 'football.jpeg', '15:37:25'),
(6, 'Mein Urra', 'Shuja Haider', 'Forces', 'Main Urra _ Shuja Hyder _ Pakistan Air Force.mp3', 'air_force.jpg', '16:31:43'),
(7, 'Izmir Marsi', 'CVRTOON', 'War', 'İzmir Marşı - War Music.mp3', 'turkish_war.jpg', '16:32:59');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `music_tracks`
--
ALTER TABLE `music_tracks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `music_tracks`
--
ALTER TABLE `music_tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
