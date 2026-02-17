-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 03, 2025 at 04:23 AM
-- Server version: 8.0.17
-- PHP Version: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sechandshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `cartTotal` double NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `orderedById` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `cartTotal`, `createdAt`, `updatedAt`, `orderedById`) VALUES
(22, 250, '2025-03-03 02:26:57.797', '2025-03-03 02:26:57.797', 1);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'เสื้อ', '2025-02-15 09:11:43.130', '2025-02-15 09:11:43.130'),
(2, 'กางเกง', '2025-02-15 09:11:48.110', '2025-02-15 09:11:48.110'),
(3, 'รองเท้า', '2025-02-15 09:11:53.950', '2025-02-15 09:11:53.950');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `asset_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `public_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secure_url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `productId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `asset_id`, `public_id`, `url`, `secure_url`, `createdAt`, `updatedAt`, `productId`) VALUES
(24, 'd893effed903d6956f5890b81a69b21d', 'Images/Image-1739938063102', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739938067/Images/Image-1739938063102.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739938067/Images/Image-1739938063102.jpg', '2025-02-19 04:07:52.269', '2025-02-19 04:07:52.269', 14),
(28, '93cb067902a1708216f3c3ab2a20a9f8', 'Images/Image-1739938252281', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739938256/Images/Image-1739938252281.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739938256/Images/Image-1739938252281.jpg', '2025-02-19 04:10:53.981', '2025-02-19 04:10:53.981', 8),
(31, 'a55b86ffdfba742995c58646815cef71', 'Images/Image-1739938282890', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739938286/Images/Image-1739938282890.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739938286/Images/Image-1739938282890.jpg', '2025-02-19 04:11:24.760', '2025-02-19 04:11:24.760', 3),
(32, '56912929db6dfdccaecad5bdb9b32e49', 'Images/Image-1739938287935', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739938291/Images/Image-1739938287935.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739938291/Images/Image-1739938287935.jpg', '2025-02-19 04:11:29.334', '2025-02-19 04:11:29.334', 2),
(35, 'c7e325519eb990f174a8cf5d0764cc23', 'Images/Image-1739942362655', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739942369/Images/Image-1739942362655.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739942369/Images/Image-1739942362655.jpg', '2025-02-19 05:19:49.175', '2025-02-19 05:19:49.175', 16),
(36, 'd03b42c9c88133fe27e6d3ad96f16c15', 'Images/Image-1739942495910', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739942502/Images/Image-1739942495910.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739942502/Images/Image-1739942495910.jpg', '2025-02-19 05:22:09.408', '2025-02-19 05:22:09.408', 17),
(42, 'c42e52594af94a84435d3034a0759e58', 'Images/Image-1739942845983', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739942852/Images/Image-1739942845983.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739942852/Images/Image-1739942845983.jpg', '2025-02-19 05:27:57.123', '2025-02-19 05:27:57.123', 21),
(44, '0c752be010b75506e1ddf0dc79c21a1a', 'Images/Image-1739938275810', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739938281/Images/Image-1739938275810.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739938281/Images/Image-1739938275810.jpg', '2025-02-19 05:36:59.218', '2025-02-19 05:36:59.218', 4),
(45, '48abbdc482ee1a9d92766beddc8bfce5', 'Images/Image-1739942602267', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739942608/Images/Image-1739942602267.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739942608/Images/Image-1739942602267.jpg', '2025-02-19 05:37:12.272', '2025-02-19 05:37:12.272', 18),
(47, '1f5e09b8d64559acea3d00db3607dde8', 'Images/Image-1739942803851', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739942810/Images/Image-1739942803851.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739942810/Images/Image-1739942803851.jpg', '2025-02-19 05:37:25.606', '2025-02-19 05:37:25.606', 20),
(49, '7052bcc3a728b7d1c0773c5195dcc021', 'Images/Image-1739938293948', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739938299/Images/Image-1739938293948.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739938299/Images/Image-1739938293948.jpg', '2025-02-19 05:59:40.068', '2025-02-19 05:59:40.068', 1),
(51, '85ca89f5eb90581ace874194eeabf157', 'Images/Image-1739937724756', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739937729/Images/Image-1739937724756.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739937729/Images/Image-1739937724756.jpg', '2025-02-19 06:00:27.169', '2025-02-19 06:00:27.169', 9),
(52, '2f819dd3beab4b5bbaa901e172ab8050', 'Images/Image-1739938121876', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1739938126/Images/Image-1739938121876.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1739938126/Images/Image-1739938121876.jpg', '2025-02-19 06:00:41.948', '2025-02-19 06:00:41.948', 13),
(53, '23fe12336648e91668bf868aedadd8d3', 'Images/Image-1740297400525', 'http://res.cloudinary.com/dsoiycpdn/image/upload/v1740297401/Images/Image-1740297400525.jpg', 'https://res.cloudinary.com/dsoiycpdn/image/upload/v1740297401/Images/Image-1740297400525.jpg', '2025-02-23 07:56:44.549', '2025-02-23 07:56:44.549', 15);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `cartTotal` double NOT NULL,
  `orderStatus` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Not Process',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `orderedById` int(11) NOT NULL,
  `stripePaymentId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` int(11) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currentcy` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `cartTotal`, `orderStatus`, `createdAt`, `updatedAt`, `orderedById`, `stripePaymentId`, `amount`, `status`, `currentcy`) VALUES
(1, 490, 'Processing', '2025-02-15 19:38:27.077', '2025-02-15 19:41:25.471', 1, 'pi_3Qsr5EP8GijDJc6c0dBid92N', 490, 'succeeded', 'thb'),
(2, 200, 'Completed', '2025-02-16 07:23:27.776', '2025-02-16 08:35:08.927', 1, 'pi_3Qt2CAP8GijDJc6c1FK8roDi', 200, 'succeeded', 'thb'),
(3, 100, 'Cancelled', '2025-02-16 07:24:08.044', '2025-02-20 18:26:49.437', 1, 'pi_3Qt2ClP8GijDJc6c1m2RzYkU', 100, 'succeeded', 'thb'),
(4, 540, 'Not Process', '2025-02-16 09:01:27.080', '2025-02-16 09:01:27.080', 1, 'pi_3Qt3ipP8GijDJc6c15iU0B6q', 540, 'succeeded', 'thb'),
(5, 780, 'Not Process', '2025-02-24 06:59:07.518', '2025-02-24 06:59:07.518', 1, 'pi_3QvvcRP8GijDJc6c1HwiBu13', 780, 'succeeded', 'thb');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `sold` int(11) NOT NULL DEFAULT '0',
  `quantity` int(11) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `price`, `sold`, `quantity`, `createdAt`, `updatedAt`, `categoryId`) VALUES
(1, 'เสื้อยืดสีแดง', 'เสื้อยืดสีแดง ขนาด XL', 100, 4, 2, '2025-02-15 09:14:15.534', '2025-02-24 06:59:07.640', 1),
(2, 'เสื้อยืดสีดำ', 'Size XL', 150, 1, 4, '2025-02-15 10:17:29.056', '2025-02-19 04:11:29.334', 1),
(3, 'กางเกงช้าง', 'เอว 29 Size L', 100, 2, 0, '2025-02-15 10:26:26.006', '2025-02-19 04:11:24.760', 2),
(4, 'กางเกงขาสั้น', 'เอว 28 Size L', 140, 2, 1, '2025-02-15 10:27:02.776', '2025-02-24 06:59:07.640', 2),
(8, 'เสื้อเชิ้ตสีขาว', 'Size XL', 200, 2, 3, '2025-02-16 08:52:07.679', '2025-02-24 06:59:07.640', 1),
(9, 'เสื้อเชิ้ตสีเขียว', 'Size 2XL ใส่ มีตำหนิ', 340, 2, 0, '2025-02-16 09:00:20.467', '2025-02-24 06:59:07.640', 1),
(13, 'กางเกงยีนส์ขายาว', 'เอว 32 Size XL ไม่เคยใส่', 1690, 0, 1, '2025-02-16 09:16:50.128', '2025-02-19 06:00:41.948', 2),
(14, 'กางเกงยีนส์ขายาว', 'เอว 30 Size XL', 1290, 0, 1, '2025-02-16 09:17:14.641', '2025-02-19 04:07:52.269', 2),
(15, 'เสื้อสเวตเตอร์สีดำ', 'Size XL', 380, 0, 3, '2025-02-19 05:17:18.906', '2025-02-23 07:56:44.549', 1),
(16, 'เสื้อฮู้ดมีซิบ', 'Size L', 300, 0, 2, '2025-02-19 05:19:49.175', '2025-02-19 05:19:49.175', 1),
(17, 'เสื้อฮู้ดสีดำ', 'Size 2XL', 499, 0, 5, '2025-02-19 05:22:09.408', '2025-02-19 05:22:09.408', 1),
(18, 'เสื้อแจ็คเก็ตยีนส์สีดำ', 'Size XL', 670, 0, 1, '2025-02-19 05:23:42.705', '2025-02-19 05:37:12.272', 1),
(20, 'รองเท้าผ้าใบ', 'สีขาว เบอร์ 42', 330, 0, 1, '2025-02-19 05:27:20.075', '2025-02-19 05:37:25.606', 3),
(21, 'รองเท้าผ้าใบ', 'สีดำ-ขาว Size 41', 890, 0, 1, '2025-02-19 05:27:57.123', '2025-02-19 05:27:57.123', 3),
(23, '123', '123', 123, 0, 123, '2025-03-03 02:41:32.616', '2025-03-03 04:21:22.617', 1);

-- --------------------------------------------------------

--
-- Table structure for table `productoncart`
--

CREATE TABLE `productoncart` (
  `id` int(11) NOT NULL,
  `cartId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productoncart`
--

INSERT INTO `productoncart` (`id`, `cartId`, `productId`, `count`, `price`) VALUES
(35, 22, 1, 1, 100),
(36, 22, 2, 1, 150);

-- --------------------------------------------------------

--
-- Table structure for table `productonorder`
--

CREATE TABLE `productonorder` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `price` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productonorder`
--

INSERT INTO `productonorder` (`id`, `productId`, `orderId`, `count`, `price`) VALUES
(1, 3, 1, 1, 100),
(2, 4, 1, 1, 140),
(3, 2, 1, 1, 150),
(4, 1, 1, 1, 100),
(5, 1, 2, 2, 100),
(6, 3, 3, 1, 100),
(7, 9, 4, 1, 340),
(8, 8, 4, 1, 200),
(9, 4, 5, 1, 140),
(10, 1, 5, 1, 100),
(11, 8, 5, 1, 200),
(12, 9, 5, 1, 340);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picture` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `name`, `picture`, `role`, `enabled`, `address`, `createdAt`, `updatedAt`) VALUES
(1, 'kk@kk.com', '$2a$10$/7XeCttcM8PZAX9OJkBAv.nR/1GO.CGYN6fq3HKkcfWwfdmSZC9lK', NULL, NULL, 'admin', 1, '123123', '2025-02-15 09:03:17.064', '2025-03-03 02:27:08.529'),
(2, 'aa@aa.com', '$2a$10$7RtqJOjHLVmCzMCfE6n4cODSo6v1DCWmnHpqo4Qc4FYrQqevXehSe', NULL, NULL, 'user', 0, NULL, '2025-02-16 16:55:17.407', '2025-02-20 18:26:26.714'),
(3, 'hoa@kom.com', '$2a$10$Y/WergfMuZcKFqdZLJf18ujL6H6nA0T3RovfQ700YR6m1vLJPFVXC', NULL, NULL, 'user', 0, NULL, '2025-02-16 17:03:08.981', '2025-02-23 07:56:01.890'),
(4, 'koadi@gmail.com', '$2a$10$6sx45wNu3w7UhrdKuGL7g.XB4b8WtjM7LVXpiIgklUL1n8cg7ZV1.', NULL, NULL, 'user', 1, NULL, '2025-02-16 17:13:15.336', '2025-02-16 17:13:15.336'),
(5, 'hoa1231@kom.com', '$2a$10$N8b3YANtZIuNt4VNcnu93eWhnEdShAvArfup0DkwRXmcXxsMwATtG', NULL, NULL, 'user', 1, NULL, '2025-02-20 18:06:50.297', '2025-02-20 18:06:50.297'),
(6, 'ka@ka.com', '$2a$10$.nn5NQ.gW1UZFed/t65HCu5Tc1CCyQAFSrxpAEHxEZAYwnpaDR3Hy', NULL, NULL, 'user', 1, NULL, '2025-03-03 03:30:06.869', '2025-03-03 03:30:06.869'),
(7, 'as@as.com', '$2a$10$3qUE/c/lBWCSNwpKi1utbO6pzFPFouRQmLctCro88rQakX7tsIOPa', NULL, NULL, 'user', 1, NULL, '2025-03-03 03:32:40.092', '2025-03-03 03:32:40.092');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Cart_orderedById_fkey` (`orderedById`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Image_productId_fkey` (`productId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_orderedById_fkey` (`orderedById`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Product_categoryId_fkey` (`categoryId`);

--
-- Indexes for table `productoncart`
--
ALTER TABLE `productoncart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductOnCart_cartId_fkey` (`cartId`),
  ADD KEY `ProductOnCart_productId_fkey` (`productId`);

--
-- Indexes for table `productonorder`
--
ALTER TABLE `productonorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ProductOnOrder_productId_fkey` (`productId`),
  ADD KEY `ProductOnOrder_orderId_fkey` (`orderId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `productoncart`
--
ALTER TABLE `productoncart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `productonorder`
--
ALTER TABLE `productonorder`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `Cart_orderedById_fkey` FOREIGN KEY (`orderedById`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `Order_orderedById_fkey` FOREIGN KEY (`orderedById`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `productoncart`
--
ALTER TABLE `productoncart`
  ADD CONSTRAINT `ProductOnCart_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ProductOnCart_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `productonorder`
--
ALTER TABLE `productonorder`
  ADD CONSTRAINT `ProductOnOrder_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ProductOnOrder_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
