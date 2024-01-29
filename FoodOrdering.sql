-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 29, 2024 at 12:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `FoodOrdering`
--

-- --------------------------------------------------------

--
-- Table structure for table `TB_Items`
--

CREATE TABLE `TB_Items` (
  `id` int(11) NOT NULL,
  `ItemName` varchar(255) NOT NULL,
  `ItemPrice` decimal(10,0) NOT NULL,
  `ItemImage` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `TB_Items`
--

INSERT INTO `TB_Items` (`id`, `ItemName`, `ItemPrice`, `ItemImage`, `createdAt`, `updatedAt`) VALUES
(1, 'PaneerTika', 400, 'paneerTika.jpg', '2024-01-29 03:38:44', '2024-01-29 03:38:44'),
(2, 'Pasta', 280, 'pasta.jpg', '2024-01-29 03:39:01', '2024-01-29 03:39:01'),
(3, 'Roti', 50, 'roti.jpg', '2024-01-29 03:39:12', '2024-01-29 03:39:12'),
(4, 'Pizza', 300, 'pizaa.jpg', '2024-01-29 03:39:30', '2024-01-29 03:39:30'),
(5, 'Noodles', 200, 'noodles.jpg', '2024-01-29 03:39:51', '2024-01-29 03:39:51'),
(6, 'Dhosa', 150, 'dhosa.jpeg', '2024-01-29 03:40:25', '2024-01-29 03:40:25');

-- --------------------------------------------------------

--
-- Table structure for table `TB_OrderCarts`
--

CREATE TABLE `TB_OrderCarts` (
  `id` int(11) NOT NULL,
  `ItemId` int(11) NOT NULL,
  `ItemName` varchar(255) NOT NULL,
  `ItemPrice` int(11) NOT NULL,
  `ItemQuantity` int(11) NOT NULL,
  `TotalPrice` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TB_Orders`
--

CREATE TABLE `TB_Orders` (
  `id` int(11) NOT NULL,
  `CustomerName` varchar(255) NOT NULL,
  `Contact` bigint(20) NOT NULL,
  `CustomerEmail` varchar(255) DEFAULT NULL,
  `NoOfMembers` int(11) NOT NULL,
  `OrderDate` datetime NOT NULL,
  `OrderTime` time NOT NULL,
  `Items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`Items`)),
  `GrandTotal` decimal(10,0) NOT NULL,
  `PaymentMode` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `TB_Orders`
--

INSERT INTO `TB_Orders` (`id`, `CustomerName`, `Contact`, `CustomerEmail`, `NoOfMembers`, `OrderDate`, `OrderTime`, `Items`, `GrandTotal`, `PaymentMode`, `createdAt`, `updatedAt`) VALUES
(1, 'Riddhi', 6754323456, 'Riddhi@gmail.com', 2, '2024-01-29 00:00:00', '12:50:00', '[{\"ItemId\":1,\"ItemName\":\"PaneerTika\",\"ItemQuantity\":2,\"Total\":\"800\"},{\"ItemId\":2,\"ItemName\":\"Pasta\",\"ItemQuantity\":1,\"Total\":\"280\"}]', 1080, 'cash', '2024-01-29 07:20:13', '2024-01-29 11:35:54'),
(2, 'Pooja', 6754323456, 'pooja@gmail.com', 2, '2024-01-29 00:00:00', '23:05:00', '[{\"ItemId\":1,\"ItemName\":\"PaneerTika\",\"ItemQuantity\":5,\"Total\":\"2000\"}]', 2000, 'online', '2024-01-29 11:35:29', '2024-01-29 11:35:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `TB_Items`
--
ALTER TABLE `TB_Items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `TB_OrderCarts`
--
ALTER TABLE `TB_OrderCarts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `TB_Orders`
--
ALTER TABLE `TB_Orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `TB_Items`
--
ALTER TABLE `TB_Items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `TB_OrderCarts`
--
ALTER TABLE `TB_OrderCarts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `TB_Orders`
--
ALTER TABLE `TB_Orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
