-- phpMyAdmin SQL Dump
-- version 5.3.0-dev
-- https://www.phpmyadmin.net/
--
-- Host: 192.168.30.23
-- Generation Time: Sep 27, 2022 at 06:10 AM
-- Server version: 8.0.18
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+07:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: btl
--
DROP DATABASE IF EXISTS btl;
CREATE DATABASE IF NOT EXISTS btl DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE btl;

-- --------------------------------------------------------

CREATE TABLE IF NOT EXISTS products (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  description text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  price double NOT NULL,
  image varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  type varchar(5) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  rating DECIMAL(2,1) CHECK (rating >= 0 AND rating <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO products (name, description, price, image, type) VALUES
('Khẽ hát lời yêu - Tập 1', 'Himari, nữ sinh mới lên cấp ba, đã đem lòng ngưỡng mộ Yori, ca sĩ hát chính của ban nhạc biểu diễn trong buổi lễ chào đón học sinh mới. Khi tình cờ gặp nhau ở trường, Himari bèn bày tỏ cảm xúc của mình với Yori. Ấn tượng với thái độ thẳng thắn ấy, Yori nhanh chóng nảy sinh tình cảm với Himari...', 65000, '/img/product/sasakoi_1.jpg', 'manga'),
('Khẽ hát lời yêu - Tập 2', 'Sau buổi đi chơi, Yori bất ngờ tỏ tình với Himari. Điều này khiến Himari vô cùng trăn trở vì “yêu” của cô khác với “yêu” của Yori. Câu trả lời của Himari là gì?', 65000, '/img/product/sasakoi_2.jpg', 'manga'),
('Khẽ hát lời yêu - Tập 3', 'Dù đã tạm hoãn lại câu trả lời cho lời tỏ tình của Yori, mối quan hệ giữa Himari và Yori không thể quay lại như trước kia. Aki tỏ ra không bằng lòng trước tình hình này và buộc phải thúc đẩy Himari. Liệu sự can thiệp của Aki có thể tạo ra bước ngoặt không?', 65000, '/img/product/sasakoi_3.jpg', 'manga'),
('Rồi hoa sẽ nở - Tập 1', 'Koito Yu, một nữ sinh lớp 10 luôn mong mỏi được trải nghiệm cảm giác yêu. Thế nhưng, cô chưa từng gặp ai có thể coi là người đặc biệt với bản thân. Một ngày, Yu tình cờ gặp Nanami Toko, một đàn chị học lớp 11 vô cùng xinh đẹp và giỏi giang. Cô vô cùng đồng cảm khi biết rằng người đàn chị cũng không thể yêu ai. Tuy nhiên, Toko đã khiến Yu vô cùng kinh ngạc với lời tỏ tình đột ngột. "Hình như chị đã phải lòng em mất rồi."', 60000, '/img/product/yagakimi_1.jpg', 'manga'),
('Rồi hoa sẽ nở - Tập 2', 'Sau khi giúp đỡ Toko trúng cử, Yu cũng trở thành thành viên của Hội Học sinh nhận được nhiều sự yêu thương từ người đàn chị. Tuy nhiên, cô cảm thấy khó xử khi trong lòng không nảy sinh bất kì cảm xúc đặc biệt nào... Cô muốn đạp lại tình cảm của Toko, nhưng trái tim lại chưa sẵn sàng cho điều đó. Mặt khác, Toko cũng đưa ra một đề xuất táo bạo trên danh nghĩa hội trưởng Hội Học sinh.', 60000, '/img/product/yagakimi_2.jpg', 'manga'),
('Rồi hoa sẽ nở - Tập 3', 'Nhìn mối quan hệ giữa Toko và Koito bỗng thân thiết lạ thường, Saeki Sayaka không khỏi lo lắng. Cô đã thầm giữ tình cảm dành cho Toko từ lâu. Phải chăng đã tới lúc dừng kìm nén cảm xúc của bản thân? Mặt khác, Yu đã lựa chọn ở bên cạnh Toko, nhưng điều này cũng đồng nghĩa cô phải từ bỏ việc yêu một ai đó...', 85000, '/img/product/yagakimi_3.jpg', 'manga'),
('Rồi hoa sẽ nở - Tập 4', 'Trại tập huấn để chuẩn bị vở kịch của Hội Học sinh bắt đầu. Toko, Yu và Sayaka đều có những suy nghĩ của riêng mình trong lúc sinh hoạt tại trại. Đúng lúc ấy, một nhân vật quen biết chị gái của Toko xuất hiện. Tuy nhiên, những điều người này biết lại không giống với những kí ức mà Toko nhớ về chị gái mình. Lý tưởng mà Toko luôn theo đuổi mòn mỏi bỗng lung lay dữ dội... Những điều ấy là gì?', 90000, '/img/product/yagakimi_4.jpg', 'manga'),
('Rồi hoa sẽ nở - Tập 5', 'Nhận ra mong muốn thay đổi Toko của bản thân, Yu đề xuất với Koyomi để sửa lại kịch bản của vở kịch. Thế nhưng, Toko lại có suy nghĩ trái ngược. Làm theo lời Yu cũng đồng nghĩa với thừa nhận những lý tưởng của bản thân suốt nhiều năm nay là sai. "Nếu trở thành chị ấy là sai thì chị phải trở thành ai đây?"', 85000, '/img/product/yagakimi_5.jpg', 'manga'),
('Rồi hoa sẽ nở - Tập 6', 'Vở kịch của Hội Học sinh chính thức bắt đầu. Đây chính là mục tiêu, đồng thời cũng là bến đỗ cuối cùng mà Toko phải nỗ lực hết mình chạm tới. Liệu kịch bản chứa đựng mong muốn của Yu sẽ đem lại điều gì cho Toko?', 85000, '/img/product/yagakimi_6.jpg', 'manga'),
('Rồi hoa sẽ nở - Tập 7', 'Vở kịch của Hội Học sinh đã gỡ bỏ toàn bộ xiềng xích của Nanami Toko. Giờ đây cô như một con người mới, có thể tự do làm mọi điều mình muốn. Tuy nhiên, bên cạnh cô lúc này không còn hình bóng người đàn em thân thương. Thời gian thấm thoát trôi qua, chuyến tham quan của lớp 11 đã tới. Dường như Sayaka cũng có một mục tiêu riêng trong chuyến tham quan này.', 90000, '/img/product/yagakimi_7.jpg', 'manga'),
('Rồi hoa sẽ nở - Tập 8', 'Cảm giác thích ai đó là thế nào? Nhờ lời tỏ tình của Sayaka, Toko đã đối diện được với cảm xúc của bản thân. Tin nhắn của cô xuất hiện ngay lúc Yu đang dần mất hi vọng. Cả hai chạy về phía nhau, để nói những điều cần nói với người mình trân trọng.', 265000, '/img/product/yagakimi_8.jpg', 'manga'),
('Bocchi The Rock - Tập 1', 'Goto Hitori là một nữ sinh hướng nội. Giao tiếp kém, học cũng kém, tay chân lại vụng về, nên suốt thời cấp 2 chẳng thể kết bạn với ai, chỉ có cây guitar bầu bạn. Khi lên lớp 10, một ngày nọ, cô nàng tình cờ gia nhập Ban nhạc Đoàn Kết, lấy nghệ danh là Bocchi và trở thành một tay guitar khuấy đảo nền nhạc Rock nước Nhật!? Nhưng trước hết, Bocchi phải nhìn được vào mắt các thành viên trong ban nhạc đã!', 40000, '/img/product/bocchi_1.jpg', 'manga'),
('Bocchi The Rock - Tập 2', 'Goto Hitori là một nữ sinh hướng nội. Giao tiếp kém, học cũng kém, tay chân lại vụng về, nên suốt thời cấp 2 chẳng thể kết bạn với ai, chỉ có cây guitar bầu bạn. Khi lên lớp 10, một ngày nọ, cô nàng tình cờ gia nhập Ban nhạc Đoàn Kết, lấy nghệ danh là Bocchi và trở thành một tay guitar khuấy đảo nền nhạc Rock nước Nhật!? Nhưng trước hết, Bocchi phải nhìn được vào mắt các thành viên trong ban nhạc đã!', 40000, '/img/product/bocchi_2.jpg', 'manga'),
('Frieren - Pháp sư tiễn táng - Tập 1', 'Sau khi đánh bại Quỷ vương, những người hùng đã sống ra sao? Là một yêu tinh nên cuộc sống của nàng pháp sư Frieren cũng khác so với 3 người bạn của mình, cô cảm nhận được điều gì trong thế giới ấy? Những người ở lại đã trải qua những gì trong chuyến đi để hoàn thành tâm nguyện của người đã khuất? Tất cả đều được bắt đầu từ "Hồi kết của cuộc phiêu lưu", một câu chuyện hậu phiêu lưu về "lẽ sống" của những anh hùng!', 45000, '/img/product/frieren_1.jpg', 'manga'),
('Frieren - Pháp sư tiễn táng - Tập 2', 'Frieren là một pháp sư yêu tinh trường thọ. Cùng với Fern - học trò của mình, họ lại một lần nữa hướng mục tiêu về lâu đài Quỷ vương, nơi được coi là vùng đất mà linh hồn của các dũng sĩ an nghỉ và cũng là để tìm lại những dấu tích trong chuyến phiêu lưu cùng Himmel và mọi người. Trên đường đi, họ đã gặp Stark, học trò của chiến binh Eisen. Câu chuyện chuyển sang chương mới đầy ắp những kỉ niệm.', 45000, '/img/product/frieren_2.jpg', 'manga'),
('Frieren - Pháp sư tiễn táng - Tập 3', 'Frieren, pháp sư thuộc đội anh hùng đã đụng độ với một trong Bảy pháp sư hủy diệt - Aura Máy chém, tàn dư của binh đoàn Quỷ vương. Cùng lúc đó, quá khứ của Frieren cũng dần được hé lộ. Tình cảm cô vẫn luôn ấp ủ bao lâu nay là thế nào? Câu chuyện tiếp tục đan xen hiện tại và quá khứ.', 45000, '/img/product/frieren_3.jpg', 'manga'),
('Frieren - Pháp sư tiễn táng - Tập 4', 'Sau khi các anh hùng qua đời, cuộc sống của pháp sư yêu tinh Frieren vẫn tiếp diễn. Cô lại một lần nữa bước lên chuyến hành trình mà các anh hùng đã từng đi. Dù là quá khứ hay hiện tại, thứ tô điểm cho chuyến đi luôn là những sự kiện và các cuộc gặp gỡ. Tập truyện tiếp theo kể về các anh hùng và cuộc sống thường nhật của họ.', 45000, '/img/product/frieren_4.jpg', 'manga'),
('Frieren - Pháp sư tiễn táng - Tập 5', 'Để tiếp tục cuộc hành trình đến Aureole, Frieren - vị pháp sư đánh bại Quỷ vương và lưu danh sử sách, đã tham gia vào cuộc thi dành cho pháp sư. Những cuộc gặp gỡ mới, những pháp sư với năng lực đáng gờm. Niềm tin và quyết tâm của từng người là gì?', 45000, '/img/product/frieren_5.jpg', 'manga'),
('Frieren - Pháp sư tiễn táng - Tập 6', 'Sang vòng 2 của cuộc thi pháp sư, Frieren - pháp sư của tổ đội anh hùng đã đánh bại Quỷ vương, phải chinh phục mê cung bí ẩn. Khi xung quanh là các pháp sư đa tài đa nghệ, năng lực thật sự của Frieren bị "lộ tẩy"! Tình cảm thầy trò của các pháp sư lại càng thêm bền chặt.', 45000, '/img/product/frieren_6.jpg', 'manga'),
('Adachi và Shimamura - Tập 1', 'Tình cờ quen nhau qua một lần trốn tiết, tình bạn giữa Adachi và Shimamura cứ vậy mà đơm hoa kết trái. Và cũng rất nhanh thôi, một thứ cảm xúc mới mẻ xen chút lạ lẫm dần nảy nở trong tim hai người qua những tháng ngày sóng đôi bên nhau...', 86000, '/img/product/adashima_1.jpg', 'manga'),
('Adachi và Shimamura - Tập 2', 'Theo tiếng ve râm ran dưới nắng hè oi ả, Adachi lại nhớ về ngày đầu tiên hai người gặp nhau, dù ngại ngùng nhưng bình yên đến lạ. Về phần Shimamura, cô đã đứng lên bênh vực bạn mình khi nghe những lời không mấy dễ chịu từ mẹ Adachi - người cô tình cờ gặp khi đang đi bơi, với mong ước cô bạn có thể thân thiết với gia đình mình hơn.', 86000, '/img/product/adashima_2.jpg', 'manga'),
('Adachi và Shimamura - Tập 3', 'Lại một năm cũ qua đi, và trong thời khắc giao thừa, Adachi và Shimamura đã trao nhau lời chúc đầy hứa hẹn cho khởi đầu mới tốt lành. Thời gian trôi nhanh tựa làn gió xuân mơn man, chẳng mấy chốc Valentine đã lại ngấp nghé bên thềm...\nTrong khi ấy, Shimamura tình cờ gặp Tarumi - người đang bị đồn thổi là một học sinh cá biệt, và cũng đồng thời là bạn thời thơ ấu của mình...', 86000, '/img/product/adashima_3.jpg', 'manga'),
('Kase Và Bìm Bìm Biếc', 'Cô bạn Kase lớp bên vừa xinh đẹp, lại còn là át chủ bài của CLB Điền kinh. Còn Yamada là thành viên của ban Phủ xanh, tính tình hướng nội. Trong lúc Yamada đang chăm bồn hoa bìm bìm biếc do mình trồng, Kase đã đến bắt chuyện với cô ấy...', 80000, '/img/product/kase_bimbimbiec.jpg', 'manga'),
('Kase và Cơm Hộp', '"Dù đều là con gái, nhưng chúng tớ đã trở thành một đôi."\nNăm lớp 12, sau khi Yamada và Kase - ngôi sao của CLB Điền kinh - bắt đầu hẹn hò, họ cũng trở thành bạn cùng lớp. Yamada đắm chìm trong hạnh phúc khi nghĩ đến viễn cảnh có thể vừa ngồi học vừa ngắm nhìn cô bạn xinh đẹp của mình.\n"Thế nhưng... \'hẹn hò\' nghĩa là làm gì nhỉ?"\nGiữa lúc ấy, chuyến du lịch ngoại khóa đáng nhớ trong quãng đời học sinh cũng đến... Cùng với nụ cười và cả những giọt nước mắt, khoảng cách giữa hai người ngày một xích lại gần hơn.', 80000, '/img/product/kase_comhop.jpg', 'manga'),
('Kase và Bánh Kem', '"Mùa hè cuối cùng đã đến rồi, mình cùng đi bơi thôi!"\nTuy cùng là con gái, nhưng Yamada, thành viên Ban Phủ xanh, và Kase, át chủ bài của Câu lạc bộ Điền kinh, đã trở thành một cặp. Trong khi Kase phải vật lộn với những bài tập khắc nghiệt để chuẩn bị cho giải đấu toàn quốc, Yamada cũng có những trăn trở riêng của mình về tương lai phía trước.', 80000, '/img/product/kase_banhkem.jpg', 'manga'),
('Kase Và Tạp Dề', '"Không có Kase thì ở lại quê nhà cũng đâu còn ý nghĩa gì nữa!"\nSau khi Kase nhận được tiến cử thể thao vào một trường đại học ở Tokyo, Yamada cũng quyết định rời khỏi vòng an toàn để đi theo tiếng gọi của trái tim. Bên cạnh những háo hức khi được sống cùng người mình yêu, sâu trong Yamada vẫn còn đó những bất an khi Kase và người bạn gái cũ trong lời đồn - chị Inoue, sẽ học chung một trường. Giữa những ngọt đắng đan xen, lễ hội văn hóa cuối cùng của đời học sinh cấp Ba cũng bắt đầu…', 80000, '/img/product/kase_tapde.jpg', 'manga'),
('Kase Và Hoa Anh Đào', 'Vào ngày thi đại học, Kase đã đến cổ vũ cho Yamada, người đang cứng đờ vì căng thẳng. Liệu mùa xuân hạnh phúc có đến với đôi bạn trẻ? Một chương mới trong nhật ký thanh xuân của Kase và Yamada xin được phép bắt đầu.', 80000, '/img/product/kase_hoaanhdao.jpg', 'manga'),
('Hành Trình Của Elaina - Tập 1', 'Ở một xứ sở xa xôi, có một cô bé phù thủy thích ngao du thiên hạ. Tên cô là Elaina, biệt danh "phù thủy tro tàn". Trong hành trình trải dài thú vị của mình, Elaina đã gặp gỡ rất nhiều người và phiêu lưu đến nhiều vùng đất trên thế giới.\nMột vương quốc mà chỉ chấp nhận pháp sư, một gã khổng lồ mê cơ bắp, một thiếu niên muốn cứu người yêu khỏi lưỡi hái Tử thần, một cô công chúa bị bỏ mặc giữa thành phố hoang tàn đổ nát, và câu chuyện của chính cô phù thuỷ nhỏ vẫn đang chờ được kể...\nTừ khi gặp gỡ những nhân vật lạ thường và trải nghiệm những khoảnh khắc tươi đẹp của họ, đến tận bây giờ, cuộc sống của cô phù thuỷ nhỏ vẫn không ngừng xoay quanh câu chuyện của những cuộc gặp gỡ và chia ly.\n"Không sao đâu. Dù gì tôi cũng là khách lữ hành mà. Tôi phải mau đi thôi."\nVâng, cô phù thủy đó chính là tôi.', 98000, '/img/product/elaina_1.jpg', 'novel'),
('Hành Trình Của Elaina - Tập 2', 'Cô gái mang mái tóc màu tro đặc trưng hơn bất cứ thứ gì khác ấy chính là một phù thủy, cũng là một lữ khách. Cô khoác trên mình chiếc áo choàng màu đen cùng một chiếc mũ tam giác nhọn đỉnh thêm chiếc huy hiệu hình ngôi sao gắn trên ngực áo đại biểu cho một phù thủy. Lúc nào cũng vậy, cô luôn ung dung tự tại bay đi trên cây chổi của mình. Cô gái đang tận hưởng sự tự do một cách xa xỉ đó rốt cuộc là ai vậy nhỉ. Đó, chính là tôi, Elaina - phù thủy Tro Tàn.\nMột ngày nọ, Elaina tình cờ được một chàng hoàng tử ở vương quốc xa xôi nhờ tìm kiếm vị hôn thê nước láng giềng bị mất tích. Trên đường tìm người giúp hoàng tử, Elaina bắt gặp một nữ kỵ sĩ oai phong cũng đang tìm kiếm nàng công chúa xinh đẹp nọ. Cuối cùng khi tìm thấy công chúa của vương quốc cối xay gió, Elaina lại rơi vào tình thế hết sức bối rối: Ai là người tình thực sự của công chúa, còn ai là kẻ muốn phá hoại hạnh phúc của nàng? Kiếm mười đồng vàng cũng đau đầu quá đi! Nhưng vẫn chưa li kỳ bằng trải nghiệm đến vùng đất của người chết và đụng ngay xác sống đâu!', 98000, '/img/product/elaina_2.jpg', 'novel'),
('Hành Trình Của Elaina - Tập 3', 'Cô ấy là một phù thủy, và cũng là lữ khách. Cô khoác lên mình tấm áo choàng đen cùng một chiếc mũ chóp nhọn màu đen, huy hiệu chứng minh cho thân phận nữ phù thủy lấp lánh trên ngực áo. Mái tóc lộ ra dưới vành nón là màu xám tro tung bay đón lấy những cơn gió lạnh. Đôi mắt màu xanh biếc đang chăm chú nhìn vào một quốc gia nho nhỏ nằm yên tĩnh nơi tiếp giáp giữa bầu trời xanh và bình nguyên. Cô gái ấy chính là tôi - Phù Thủy Tro Tàn Elaina.\nChẳng ngờ một ngày tôi lại gặp rắc rối vì thứ "Thuốc biến đồ vật thành con người" do chính mình chế tạo ra. Kỳ này tôi đã học được bài học về sức mạnh đáng sợ khi đồ vật nổi dậy - thật may tôi lại được cây chổi yêu quý của mình cứu giúp. Chuyến đi lần này không thiếu những trải nghiệm kịch tính, dở khóc dở cười, có thú vị mà cũng có cả kinh hãi tột độ: bất đắc dĩ trở thành "quý cô giẫm nho", du hành ngược thời gian, gặp những bản sao khác nhau của chính mình... nhưng đau lòng nhất vẫn là mất đi mái tóc dài T_T', 98000, '/img/product/elaina_3.webp', 'novel'),
('Hành Trình Của Elaina - Tập 4', 'Cô ấy là một phù thủy, và cũng là lữ khách. Cô khoác lên mình tấm áo choàng đen cùng một chiếc mũ chóp nhọn màu đen, huy hiệu chứng minh cho thân phận nữ phù thủy lấp lánh trên ngực áo. Mái tóc lộ ra dưới vành nón là màu xám tro tung bay đón lấy những cơn gió lạnh. Đôi mắt màu xanh biếc đang chăm chú nhìn vào một quốc gia nho nhỏ nằm yên tĩnh nơi tiếp giáp giữa bầu trời xanh và bình nguyên. Cô gái ấy chính là tôi - Phù Thủy Tro Tàn Elaina.\nChẳng ngờ một ngày tôi lại gặp rắc rối vì thứ "Thuốc biến đồ vật thành con người" do chính mình chế tạo ra. Kỳ này tôi đã học được bài học về sức mạnh đáng sợ khi đồ vật nổi dậy - thật may tôi lại được cây chổi yêu quý của mình cứu giúp. Chuyến đi lần này không thiếu những trải nghiệm kịch tính, dở khóc dở cười, có thú vị mà cũng có cả kinh hãi tột độ: bất đắc dĩ trở thành "quý cô giẫm nho", du hành ngược thời gian, gặp những bản sao khác nhau của chính mình... nhưng đau lòng nhất vẫn là mất đi mái tóc dài.', 98000, '/img/product/elaina_4.webp', 'novel'),
('Hành Trình Của Elaina - Tập 5', 'Ở xứ sở xa xôi, có một cô phù thủy tên Elaina. Nhờ ảnh hưởng sau khi đọc "cuốn sách nọ" từ thuở nhỏ, cô đang thực hiện chuyến du hành thật dài.\nLần này, chúng ta sẽ làm quen với một cô bé sống trong lồng chim khổng lồ, cô công chúa lạnh lùng và tên siêu trộm, hồi tưởng về hai nữ phù thủy trẻ tuổi, gặp lại nàng công chúa ở Vương quốc Cối xay gió cùng nữ hiệp sĩ, trải nghiệm hành trình của hai chị em đến Vương quốc Đưa Tin, nghe câu chuyện của cô gái bí ẩn thấy trước tương lai, và cuối cùng được gặp lại người thầy đáng kính và hai cô bé tóc đen nhiều duyên ngộ.\nCó những cuộc gặp gỡ mới mẻ, cũng có những lần tái ngộ những khuôn mặt thân quen... Dấn thân vào các vụ án kỳ lạ, được tao ngộ lẫn ly biệt cùng những người thân yêu với cô chưa bao giờ là nhàm chán.\n"Em cũng vậy, cũng rất yêu quý cô… và tất cả mọi người."\nQuyển nhật ký du hành đầy huyền bí và hấp dẫn - Hành trình của Elaina, nay lại bước sang trang mới.', 98000, '/img/product/elaina_5.webp', 'novel'),
('Hành Trình Của Elaina - Tập 6', 'Chuyến du hành của cô phù thủy Elaina được tiếp tục ở thành phố của những đường đua. Cô tham gia vào cuộc "đua chổi" ở thành phố xa lạ này và gặp những con người mới đầy thú vị.\n"À, còn chỗ trống trên hàng ghế khán giả đấy. Ngồi đó xem bọn tao giành chiến thắng đi nhé?"\nVẻ thách thức của cô ấy như đang ngầm khiêu chiến...', 108000, '/img/product/elaina_6.webp', 'novel'),
('Hành Trình Của Elaina - Tập 7', 'Bên trong khu rừng xanh mát, ngập tràn không khí trong lành của một buổi sáng đầu mùa hạ, những làn gió tươi mát làm xao xuyến lòng người còn sót lại của mùa xuân vẫn nhè nhẹ xào xạc trên ngọn cây.\nMột cô lữ khách đang cưỡi chổi bay vào khu rừng.  Cô còn rất trẻ, với mái tóc màu tro xám cùng đôi mắt màu xanh ngọc bích. Trên người khoác áo choàng màu đen, đầu đội chiếc mũ chóp. Ngực áo cài chiếc huy hiệu chạm khắc hình ngôi sao nổi bật.\nThiếu nữ đang tự do, phóng khoáng cưỡi trên cây chổi bay đi ngao du hết nơi này đến nơi khác ấy là một lữ khách, cũng là một phù thủy. Cô cưỡi trên cây chổi bay lơ lửng trên cao, chậm rãi hít hà căng đầy lồng ngực sự tinh khiết mát lành của cơn gió khe khẽ thổi qua như đang nuối tiếc chút sắc xuân còn sót lại.\nVậy rốt cuộc cô gái ấy là ai vậy nhỉ?\nVâng, chính là tôi đây.', 108000, '/img/product/elaina_7.webp', 'novel'),
('Hành Trình Của Elaina - Tập 8', 'Sau hôm cùng sư phụ Frann ngắm sao, chúng tôi rời khỏi đống tàn tích - nơi đã từng là vương quốc Biela trong rừng sâu và tiến ra thảo nguyên. Chúng tôi đã nói chuyện với nhau về hành trình du ngoạn của bản thân suốt cả đêm dài đằng đẵng, vậy nên cả tôi lẫn sư phụ đều hơi thiếu ngủ. Ánh mặt trời chiếu sáng rực rỡ trên thảo nguyên lúc này bỗng trở nên chói lóa, có phần khiến chúng tôi hoa mắt.\n"Bây giờ ta đi đâu tiếp đây?" Sư phụ Frann cũng giống tôi, nheo mắt lại như thể đồng cỏ kia đang phát sáng chói lòa và nói như vậy. Lời nói đó nghe như thể bản thân cô ấy đang tự trăn trở về hướng đi tiếp theo, cũng lại nghe như đang hỏi về hành trình sắp tới của tôi vậy.\nNếu chúng tôi cứ đi du ngoạn hai người như vậy thì chuyến hành trình của tôi sẽ trùng với chuyến hồi hương của sư phụ Frann mất. "..." Đối với tôi thì đó cũng là một chuyện vô cùng tuyệt vời.\n"Có nơi nào con muốn đến không?" Cô ngoảnh lại và mỉm cười với tôi. Tôi cũng cười đáp lại cô ấy.\n"Chỉ cần là đi cùng sư phụ thì con đi đâu cũng được."', 118000, '/img/product/elaina_8.webp', 'novel'),
('Hành Trình Của Elaina - Tập 9', 'Tôi vốn chẳng phải đứa ngoan ngoãn, dễ bảo gì nhưng có lẽ ít nhiều cái tính đó cũng là do bị "lây" từ sư phụ Frann của tôi. Dù chẳng hẹn trước sẽ cùng nhau chu du thiên hạ, giờ đây cả hai cô trò lại cùng nhau song hành trên cây chổi của mình thẳng tiến cùng một đích.\nTrước mắt chúng tôi là thảo nguyên mênh mông, trải dài tận chân trời. Phóng tầm mắt ra xa nhìn thảo nguyên như mặt biển ấy sẽ thấy đâu đâu cũng là màu xanh mướt của cỏ cây. Những cơn gió mát lạnh thổi qua nghe xào xạc bên tai. Choáng ngợp trước vẻ đẹp của cảnh sắc nơi đây, tôi lặng nghe từng tiếng gió khẽ thổi qua tai vừa ước ao giá mà thời gian có thể ngừng lại mãi mãi tại thời khắc tuyệt vời này.', 118000, '/img/product/elaina_9.webp', 'novel'),
('Hành Trình Của Elaina - Tập 10', 'Chúng ta lại gặp nhau rồi!\nĐúng - Là tôi, Elaina đây.\nĐố bạn biết giờ tôi đang ở đâu? Đoán đi nào, tôi ấy, bạn có nghĩ ra chỗ tôi đang ở không?\nTôi nghĩ rằng bạn cũng không thể đoán ra được ngay đâu, bởi vậy, tôi sẽ đưa ra gợi ý cho bạn nhé!\nNếu như nhìn từ góc độ của bạn, có lẽ sẽ thấy nơi này chỉ toàn chữ với chữ, trông giống hệt một thế giới đơn sắc, buồn tẻ, chán ngắt vậy.\nĐây là thế giới phẳng của những trang giấy, và tôi dám chắc rằng mình chỉ là một trong số hàng vạn con chữ trong này thôi. Tôi đang ở đấy đấy.\nVậy bạn đã đoán ra được tôi ở đâu chưa?', 128000, '/img/product/elaina_10.jpeg', 'novel'),
('Hành Trình Của Elaina - Tập 11', 'Tiếp nối với nội dung của tập truyện trước, cô nàng Elaina tiếp tục chuyến ngao du khắp thế gian một mình và tận hưởng cuộc sống một cách trọn vẹn. Trên cuộc hành trình lần này, cô đã gặp được...\nMột thám tử bí ẩn điều khiển rối, một hình nhân phép thuật không ngừng bảo vệ khu xử lý chất thải.\nMột "Phù thủy Sủng ái" sống trong căn biệt thự đáng ngờ và một "Phù thủy Bóng đêm". Một trưởng đoàn kịch bị chi phối bởi những tin đồn không chung thủy.\nCặp anh em sống ở đất nước theo chủ nghĩa ăn chay.\nNhững con quái vật thông minh và những dân du mục ẩn náu trong rừng rậm.\nVà cuối cùng là một ả ma cà rồng đi từ đất nước này sang đất nước khác để tìm kiếm máu của các thiếu nữ xinh đẹp.\nHôm nay cũng vậy, Elaina cảm thấy vô cùng hào hứng khi được gặp gỡ và làm quen với những nhân vật kỳ lạ ở một góc nhỏ của thế giới rộng lớn này.', 118000, '/img/product/elaina_11.webp', 'novel'),
('Hành Trình Của Elaina - Tập 12', 'Ngày xửa ngày xưa, có một cô phù thủy tên Elaina. Cô đang trong chuyến hành trình chu du tự do, không bị ràng buộc bởi bất cứ ai hay bất cứ chuyện gì. Lần này, chuyến ngao du sẽ đưa cô đến gặp những con người đầy cá tính...\nMột nhóm thợ săn yêu tinh và yêu tinh bóng tối lang thang tìm kiếm bạn đồng hành.\nNgười du hành giàu có trên con đường đấu tranh để lấy lại nụ cười cho con gái mình.\n"Phù thủy than củi" cùng em gái trong nhiệm vụ điều tra bí mật. \nCặp chị em đang tìm kiếm một mái ấm mới.\nMột nữ phù thủy cá tính mạnh mẽ nhắm đến công việc kinh doanh đầy nhiệt huyết.\nVà một thầy trừ tà trẻ tuổi dừng chân tại một ngôi làng nọ.\nNhững cuộc gặp gỡ và sự kiện lần này sẽ được viết lại trong nhật ký của Elaina như nào đây?\n"Chà, nếu tôi đã ra tay thì mọi chuyện sẽ ổn thôi."', 118000, '/img/product/elaina_12.webp', 'novel'),
('Hành Trình Của Elaina - Tập 13', 'Ngày xửa ngày xưa, có một cô phù thủy tên Elaina. Cô tiếp tục chuyến hành trình tự do, lang thang khắp nơi trên thế giới. Trên con đường lần này, những người cô tình cờ gặp gỡ là...\nMột mĩ nữ tự do đang chăm chỉ kiếm tiền một cách đáng ngờ.\nMột chàng trai trẻ mong muốn cái chết nhẹ nhàng cùng một quý ông bảnh bao đầy bí ẩn.\nMột tay buôn nô lệ gặp nhiều phiền muộn với người bạn gái và một điệp viên nằm vùng.\n"Phù thủy Đá vụn" hiền hòa và "Phù thủy Trường Hạ" mắc bệnh giao tiếp.\nMột cô chủ nhà trọ di động.\nMột pháp sư bị mắc kẹt bởi thanh kiếm bị nguyền rủa.\nCứ lần lượt, họ lại vướng vào những rắc rối khó giải quyết.\n"Cứ để đó cho tôi, tôi đã có ý tưởng rồi."', 115000, '/img/product/elaina_13.webp', 'novel'),
('Hành Trình Của Elaina - Tập 14', 'Ngày xửa ngày xưa, có một cô phù thủy tên Elaina. Bị thuyết phục bởi những câu chuyện hấp dẫn, cô trở thành một lữ khách ngao du khắp mọi nơi trên thế giới. Cô sẽ gặp được ai trên chuyến hành trình lần này nhỉ?\nNhững thương nhân, du khách qua đường tụ tập tại "Quán ăn lữ hành" xì xầm bàn tán cơ số câu chuyện mới mẻ.\nPhù thủy Bụi Sao thời còn trẻ cùng sư phụ và người dân "Đất nước của những câu chuyện".\nCô gái với biệt danh "Kết Án Viên" đang bảo vệ quốc gia dần phục hồi sau thời kì gian khó.\nCảnh quân tập sự thuộc Cục Bảo An trên đường truy nã tên sát nhân hàng loạt hiểm ác.\nNhà phát minh thiên tài được gọi với cái tên “Phù thủy Bờ Hồ” đã tạo ra một đất nước không bao giờ ngủ...\nDường như hành trình du ngoạn đầy màu sắc của Elaina vẫn sẽ tiếp tục...\n"Phù thủy thì cũng là người bình thường thôi mà."', 115000, '/img/product/elaina_14.webp', 'novel'),
('Nữ Chính Sinh Tồn Mạnh Mẽ Trong Thế Giới Otome Game - Tập 1', 'Alicia là một cô bé mồ côi sống trong thế giới của kiếm và phép thuật - Ciel. Một ngày nọ, cô nhận ra bản thân mình chỉ là một "nữ chính trong Otome Game". Ngay cả sự ra đi của cha mẹ cô cũng chỉ là một phần trong câu chuyện ấy.\nCho rằng sự thật này quá đỗi "nực cười", Alicia đã dứt khoát chối bỏ vai trò nữ chính trong Otome Game của mình, tự xưng là nhà thám hiểm "Aria" và từng bước trưởng thành, hóa thân thành nàng "công chúa lọ lem tàn sát" thành thạo vô số loại vũ khí và tinh thông phép thuật! Ấy vậy, qua một lần tiếp nhận nhiệm vụ bảo vệ cho "nữ phản diện", cô đã bị cuốn vào vòng xoáy tranh quyền đoạt vị của giới quý tộc trong trò chơi từ lúc nào không hay.\n"Tôi là \'chính tôi\'. Tôi không phải là một nhân vật trong trò chơi!"\nCầm vũ khí lên! Rèn luyện nhiều kỹ năng hơn nữa đi!\nChiến đấu và sống sót trước cường địch, đập tan thế giới Otome Game nực cười này!\nĐây là câu chuyện về thế giới viễn tưởng khốc liệt và đầy kịch tính, nơi nữ chính chiến đấu ngoan cường làm lay động hàng triệu con tim.', 209000, '/img/product/otome_1.png', 'novel'),
('Nữ Chính Sinh Tồn Mạnh Mẽ Trong Thế Giới Otome Game - Tập 2', 'Vài tháng sau khi sống sót trong dòng sông đầy rẫy ma thú, Alicia đã trở thành đệ tử của Serjura và học ma thuật từ cô, thế nhưng những tháng ngày bình yên đó lại đột nhiên vỡ tan. Thành viên chủ chốt của Hội Sát thủ đã đe dọa sư phụ cô để ép buộc cô thực hiện một ủy thác. Trước kẻ thù rắp tâm lợi dụng sư đồ mình, cô chỉ đáp lại một câu: "Tôi sẽ lấy mạng bất cứ ai trở thành kẻ thù của mình."\nSau khi nhận công việc ám sát thay cho sư phụ, cô đã trà trộn vào bên trong hang ổ ác nhân!\nNgươi lừa ta gạt với những "đồng đội" giả tạo, chạm trán nữ phản diện đáng sợ nhất - Carla...\nThứ đang chờ đợi cô bé là tự do, hay là cái chết đây?\nTôi luyện nhiều kỹ năng hơn nữa đi, vì người quan trọng ấy! Cầm vũ khí lên đi!\nĐây là tập 2 của câu chuyện về thế giới viễn tưởng đầy kịch tính, nơi nữ chính mạnh mẽ vô song chiến đấu ngoan cường!', 179000, '/img/product/otome_2.png', 'novel'),
('Tôi Là Nhện Đấy, Có Sao Không? - Tập 1', '"Tôi", người chắc chắn đã từng là một nữ sinh cấp ba, lúc tỉnh dậy thì lại đang ở một nơi lạ hoắc, đầu thai chuyển sinh thành quái vật <Nhện>!?\nSau cuộc đào tẩu ngoạn mục thoát khỏi đám Nhện mới nở ăn thịt lẫn nhau, tôi lạc vào hang ổ của một đám quái vật.\nThân phận Nhện bé nhỏ của "tôi" liệu có thể sống sót nổi trong chốn Hầm ngục khủng khiếp, đầy rẫy những là Ếch độc, Mãng xà, Khỉ đột, với Rồng, trùm cuối thống trị tất cả nơi này không đây…? Mày đùa với ai thế hả Nhện! Đứa nào đã bày ra cái trò này, ra ngay cho bà hỏi tộiiiiii…!', 109000, '/img/product/kumo_1.jpg', 'novel'),
('Tôi Là Nhện Đấy, Có Sao Không? - Tập 2', '"Tôi", kẻ đã quen xài tơ Nhện trong những trận đánh lộn với lũ quái vật gớm ghiếc. Hướng đến mục tiêu chinh phục Mê cung dưới lòng đất đầy cạm bẫy, tôi đã chạy tới khu vực mới mang tên "Tầng trung" nhưng... Nơi đó lại là một vùng đất rộng lớn đầy dung nham phun trào nóng rực!\nMỗi việc đi đứng thôi cũng đã mất máu rồi, vũ khí duy nhất là tơ thì cháy như diêm? Dồn ép tôi tới tình trạng ngắc ngoải là những con quái vật phun lửa đạn và Ma pháp không chút khoan nhượng. Đã thế, chủ nhân của Tầng trung - Hỏa Long lại nắm giữ Kỹ năng khiến chúng phải phục tùng...', 109000, '/img/product/kumo_2.jpg', 'novel'),
('Tôi Là Nhện Đấy, Có Sao Không? - Tập 3', 'Ngay cả "Tầng trung" bị biển lửa - vốn là yếu điểm chí mạng của Nhện bủa vây, ấy vậy mà tôi đây vẫn có thể sống sót qua ngày thậm chí còn liên tục Tiến hóa, "tôi" hiện tại đang trong tâm trạng "đánh nhau chỉ là ba cái chuyện lẻ tẻ". Thân là Nhện mà vẫn có thể đánh bại Hỏa long, tự tôi cũng phải phục bản thân sát đất! Nhưng trái lại, vì tôi đã trở nên quá mạnh khiến đám Ma vật nhãi nhéo sợ chạy mất dép, thành ra làm tôi đói meo...\nThế nhưng vào một ngày, "tôi" đã tái ngộ với ... Địa Long Arava, minh chủ của Đại Mê cung, đồng thời là đối thủ không đội trời chung của tôi. Mặc dù tôi đã vận dụng toàn bộ trí tuệ cùng với tất cả các Kỹ năng mà tôi đã đánh cược cả sinh mệnh để có được, thế mà vẫn không thể chống chọi nổi kẻ địch, trận huyết chiến với vận mệnh tồi tệ nhất đã bắt đầu...', 109000, '/img/product/kumo_3.jpg', 'novel'),
('Tôi Là Nhện Đấy, Có Sao Không? - Tập 4', '"Hãy bỏ qua cho tôi vì đã hưng phấn quá độ. Thì cũng bởi… cuối cùng thì… Tôi đã thoát được khỏi cái Đại Mê cung Elroe đó rồi!"\nTập tiếp theo trong series ẩm thực cùng bé Nhện, tạm chia tay với Đại Mê cung Elroe, hãy cùng bé Nhện khám phá những vùng đất tiếp theo của dị giới nhé.\nCuối cùng, tôi đã đến với mặt đất hằng mong ước. Trên núi tôi đã xơi trái cây, dưới biển tôi đã xực rồng nước. Say oh yeahh!!! Thế nhưng sự bình yên đó đã không kéo dài được bao lâu.\n"Ôi, Mẹ của con hỡi..." Bà mẹ vẫn yên vị tại khu vực sâu nhất của Đại Mê cung bất thình lình xuyên thủng các tạo vật khổng lồ. Cơ mà, chỉ bước đi thôi cũng khiến mặt đất biến dạng giống như vết tích của một cơn bão vậy?! Nữ hoàng của loài Nhện, mạnh mẽ hơn cả Rồng, tất cả mọi thứ đều vượt trội hơn tôi. Phải, thậm chí là thứ vũ khí "bẫy" tối thượng của tôi...', 109000, '/img/product/kumo_4.jpg', 'novel'),
('Tôi Là Nhện Đấy, Có Sao Không? - Tập 5', 'Tập 5 trong series Tôi là Nhện đấy, có sao không?, một series light novel về cuộc chiến sinh tồn của "Tôi". Người chắc chắn đã là một nữ sinh cấp ba, lúc tỉnh dậy thì lại đang ở một nơi lạ hoắc, đầu thai chuyển sinh thành Nhện!?\nTrong tập 5, cuối cùng Người chuyển sinh học cùng lớp cuối cùng cũng xuất hiện. Đã thế còn là Ma cà rồng rồi tiểu thư quý tộc "gian lận" nữa chứ! Ghen tị chết mất! Nhưng, "tôi" đã không nhắm mắt cho qua chuyện cô ta bị thổ phỉ tấn công, lại còn nhiệt tình giúp đỡ.\nCứu mạng trẻ con, còn thêm cái tính thỉnh thoảng lại trị bệnh cho dân làng nữa, trong thị trấn bắt đầu nhầm lẫn tôi là Thần. Nói gì thì nói, mấy món lễ vật cúng Thần ngon miễn chê!\nTuy nhiên, với việc trừng trị lũ côn đồ rắp tâm mưu toan bắt cóc trẻ con, tôi đã chọc vào "ổ kiến lửa", thế lực thứ ba của thế giới này, "tộc Elf"...\nVà, sàn diễn lần này chính là câu chuyện bước vào hình thái Tiến hóa kế tiếp của "tôi"!!!', 109000, '/img/product/kumo_5.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 1', 'Azusa là một kẻ "cuồng công việc" điển hình, không yêu đương, không bạn bè, không niềm vui và sở thích, cô cống hiến cuộc đời mình cho công việc. Và kết quả là, Azusa chết vì làm việc quá sức. Nhờ phép màu, cô được tái sinh trong dáng hình của một phù thủy 17 tuổi trường sinh bất lão.\nQuyết tâm sống thật khác kiếp trước, Azusa nhàn nhã diệt Slime suốt 300 năm và đã vô tình đạt level max. Sức mạnh đi đôi với những phiêu lưu mạo hiểm mới mà Azusa chưa từng đối mặt trong đời. Nhưng cũng từ đó cô có được niềm vui, có bạn bè và gia đình mới...', 89000, '/img/product/slime_1.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 2', 'Azusa - cô gái 27 tuổi, chỉ biết tới công việc, không yêu đương, không quan tâm gia đình, cũng chẳng có bạn bè. Và kết thúc cuộc sống của mình khi mà núi công việc vẫn chồng chất trên đầu.\nKhông phải ai cũng may mắn được làm lại cuộc đời một lần nữa. Và giờ Azusa đã không còn đơn độc. Bên cạnh cô có những người bạn kỳ lạ, nhưng luôn sát cánh và trở thành gia đình của cô. Với quyết tâm biến cuộc sống của mình sao cho thật ý nghĩa, Azusa đã nhận ra rằng cuộc đời này không chỉ có công việc, mà còn tồn tại biết bao điều thú vị và tươi đẹp ngoài kia.', 89000, '/img/product/slime_2.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 3', 'Gia đình Azusa không lúc nào là không có chuyện, và ở tập 3 này một chuyện kinh khủng lại xảy ra, Farufa đã bị biến lại thành slime. Gia đình Azusa sẽ phải làm gì để giúp Farufa quay trở lại hình dạng con người?\nKhông còn chỉ loanh quanh tại làng Furata, cũng không chỉ ở trong ngồi nhà trên Cao nguyên, cuộc hành trình của Azusa ngày một xa hơn và đi kèm với đó là biết bao điều mới mẻ thú vị khác đang chờ đợi.\nCâu chuyện của cô gái trẻ, chết vì làm việc quá sức ở tuổi 27. Với quyết tâm làm lại cuộc đời mình, sống thật khác kiếp trước, cùng những người bạn mới, cùng gia đình mới, Azusa đã được trải nghiệm những điều tuyệt vời mà trước đây cô từng trải qua.', 98000, '/img/product/slime_3.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 4', 'Do sự bất cẩn của Harukara, Azusa bị biến thành trẻ con. Cô phải làm gì để biến lại hình dáng ban đầu?\nTại ngôi làng nhỏ Furata, một nghệ sĩ hát rong bỗng xuất hiện. Gia đình Azusa lại ra tay giúp đỡ cô nàng này thực hiện ước mơ. Nhưng lần này còn có sự xuất hiện của Ma Vương rắc rối Pecora nữa. Mọi chuyện sẽ ra sao đây?', 103000, '/img/product/slime_4.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 5', 'Sau khi trở về từ "Hội nghị Tinh linh Thế giới", Azusa cùng với gia đình của mình lại tiếp tục tham gia vào những hành trình khám phá vô cùng thú vị.\nVà đặc biệt, trong tập này ngôi nhà trên cao nguyên còn đón thêm một thành viên mới. Hai chị em Farufa có thêm một cô em gái.\nMọi chuyện trở nên rắc rối hơn rồi đây.', 109000, '/img/product/slime_5.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 6', 'Mùa hè đã đến rồi, không bỏ qua cơ hội này, cả gia đình Azusa cùng nhau đi tắm biển. Nhưng rắc rối này là sao đây?\nMột đám cưới được diễn ra, một vụ bắt cóc nguy hiểm...\nLại là một tập mới đầy màu sắc của gia đình Azusa.', 105000, '/img/product/slime_6.png', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 7', 'Một Azusa bị thu nhỏ đã quá quen thuộc với các bạn. Vậy một Azusa bị biến thành người cáo thì sao đây? Và lần này người lừa Phù thủy Cao nguyên là ai? Cô nàng "Azusa cáo" tinh nghịch và vô cùng đáng yêu cùng với những cuộc phiêu lưu mới đang chờ đón các bạn!\nNgoài ra, cuối tập này, câu chuyện về cuộc sống làm việc bận rộn của Beelzebub "Làm một công chức quèn suốt 1500 năm, nhờ sức mạnh của Ma Vương mà được làm Bộ trường" cũng đã quay lại!', 115000, '/img/product/slime_7.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 8', '"Tôi nghĩ mình đã level max rồi, nhưng lại còn trở nên mạnh hơn nữa!"\nTưởng rằng bản thân đã level max nhưng thực chất là chưa đâu. Azusa tập này sẽ còn mạnh hơn nữa sau khi giải quyết rắc rối giúp một vị thần có thể nói là hơi vô trách nhiệm. Cùng đoán xem người đó là ai nhé!\nHy vọng sức mạnh được tăng thêm này có thể giúp cô nàng vượt qua những rắc rối gặp phải thường ngày.', 115000, '/img/product/slime_8.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 9', '…Nói thế nhưng đó chỉ là chuyện xảy ra trong thế giới thu nhỏ mà Nữ thần tạo ra mà thôi.\nDù tôi có chút lo lắng không biết mình có quay trở lại hình dạng cũ được không, nhưng cũng vui lắm!\nLần này tôi còn thử cắt tóc (không phải do thất tình đâu nha), hẹn hò với các cô con gái (cực kì hạnh phúc), thưởng lãm môn thể thao (?) của vùng đất Ma tộc. Sau đó, tôi còn có thêm một cô con gái (slime) khác!\nCuối tập là câu chuyện về những bữa ăn của giám đốc Harukara, "Bữa cơm của Elf"!!', 120000, '/img/product/slime_9.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 10', 'Sau 300 năm kiên trì diệt slime, cuối cùng thì... tôi cũng quyết định mở một cửa hàng tại lễ hội!?\nĐó là do tôi đã có một động lực vô cùng đặc biệt từ câu nói "Mẹ à, chúng ta hãy mở một cửa hàng tại lễ hội bánh kẹo đi. Chúng ta nhất định có thể chiếm lấy vị trí cửa hàng số 1" mà con gáiSharusha của tôi đã nói.\nBên cạnh đó, chúng tôi đã gặp một cô nàng thầy bói có khả năng vừa ca hát vừa tiên đoán (Luna Luna ~), dành một ngày - thứ mà nói đúng ra thì là một cuộc thám hiểm cùng với cô con gái thích màu trắng của tôi, và Flat Rute thì đột nhiên trở nên ngoan hiền một cách đáng sợ...\nỞ cuối cuốn sách này cũng sẽ có sự xuất hiện của ngoại truyện đầy thú vị "Bữa ăn của Elf" nữa.', 139000, '/img/product/slime_10.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 11', 'Diệt slime suốt 300 năm, tôi... tham gia chạy tiếp sức lúc nào chẳng hay!?\n"Chẳng phải đây là thế giới khác hay sao!?" Mặc dù nghĩ như vậy, nhưng bởi vì các thành viên trong nhà đều có vẻ khá hào hứng với việc này nên bọn tôi sẽ cố gắng hết mình (Tôi nhất định sẽ chiến thắng!)\nBên cạnh đó, tôi còn lên kế hoạch tham dự Lễ hội âm nhạc với Tinh linh Mặt Trăng nữa (Luna luna~).\nKhông những thế, tôi còn đến thăm hai chị em Leviathan vào ngày nghỉ (Quả là một trải nghiệm xa xỉ). Và còn cả việc hai cô con gái đáng yêu của tôi bỏ nhà ra đi nữa... Hả!?\nCuối truyện sẽ là "Trận chiến Học viện" của Raika trong "Học viện nữ sinh Rồng Đỏ".', 159000, '/img/product/slime_11.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 12', 'Diệt slime suốt 300 năm, cuối cùng thì tôi cũng gặp được UFO rồi!?\nNhưng nghĩ lại, tôi vẫn nhìn thấy các hồn ma mỗi ngày đó thôi, vậy nên cũng không có gì đặc biệt cho lắm. Thế nhưng vẫn thật tuyệt vời khi được thấy những cô con gái yêu của mình náo động vì chuyện đó. Và đúng như dự đoán, chân tướng thực sự của chiếc UFO này chính là...!\nBên cạnh đó, trong tập này, tôi cũng sẽ tạo ra các món ăn mới từ gạo, đi tham quan các địa điểm tâm linh cùng các ác linh, và còn ra khơi tìm bạn của Slime Thông thái nữa.\nCuối truyện sẽ là trận chiến trường học đầy hỗn loạn của Raika trong ngoại truyện "Học viện Nữ sinh Rồng Đỏ"!', 149000, '/img/product/slime_12.jpg', 'novel'),
('Diệt Slime Suốt 300 Năm, Tôi Levelmax Lúc Nào Chẳng Hay - Tập 13', 'Diệt slime suốt 300 năm, cuối cùng thì tôi cũng được gặp Thần Chết rồi!?\nTrước giờ tôi vẫn có thành kiến rằng đây là một con người vô cùng nguy hiểm, nhưng sau gặp rồi mới thầy cô ấy "chẳng khác gì các vị thần trên thế giới này cả".Thêm vào đó, trong tập này, tôi sẽ cùng Pecora đi qua những vùng đất của Ma Tộc (nghe thật lãng mạn làm sao), chinh phục thế giới TV Game được tạo ra bởi Thần Linh (Chơi TV Game ở Thế giới khác...), còn Harukara đã sẵn sàng để chấp nhận lời thách thức đến từ một siêu trộm huyền bí.\nCuối truyện sẽ là trận chiến trường học đầy hỗn loạn của Raika trong ngoại truyện "Học viện Nữ sinh Rồng Đỏ".', 149000, '/img/product/slime_13.png', 'novel');


CREATE TABLE IF NOT EXISTS users (
  username varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL PRIMARY KEY,
  password varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  name varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  phone varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  token varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  avatar varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '/img/user/ava.jpg',
  is_admin tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO users(username, password, name, phone, token, is_admin) VALUES
('admin', '049a747b944dcfb7f981ee92fd4fc936b24483c47c859f14194e46c18ec12379', 'Super Idol', '0969696969', 'mATBtA2AqAJA<AqBjAXBHBRBLAMBCAiBwAVBtAbBAAAAAA4=', 1),
('lio', 'ef2bee7868007cd42452329cd8715ed79498b539494f668d2980ef5aba6b40d5', 'Do Nhat Thai', '0969696969', 'LIO', 0),
('baodoktah', '146c260b042d6ecae39ea6d1aa41fc30518de7458ee82b28f74d39204df27d0e', 'Kim Gia Bao', '0969696969', 'BAO', 0),
('ntc', 'd54475fcd421a48df39189e42c17f45567765a091d3a44970c21f06c5e0d1a76', 'Nguyen The Cuong', '0969696969', 'NTC', 0),
('bruhkirie', '3486d739b44e18ff1826a9f6e64ef87bbbaf7d64417a6a20416d3c8dd193bc98', 'Le Nhat Anh', '0969696969', 'BRUHKIRIE', 0);


CREATE TABLE IF NOT EXISTS cart (
  username varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  pid int(11) NOT NULL,
  amount int(11) NOT NULL,
  PRIMARY KEY (username, pid),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (pid) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELIMITER //
CREATE PROCEDURE AddToCart(IN p_username VARCHAR(255), IN p_pid INT, IN p_amount INT)
BEGIN
    DECLARE existing_amount INT;

    SELECT amount INTO existing_amount
    FROM cart
    WHERE username = p_username AND pid = p_pid;

    IF existing_amount IS NOT NULL THEN
        UPDATE cart
        SET amount = amount + p_amount
        WHERE username = p_username AND pid = p_pid;
    ELSE
        INSERT INTO cart(username, pid, amount)
        VALUES(p_username, p_pid, p_amount);
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE UpdateCart(IN p_username VARCHAR(255), IN p_pid INT, IN p_new_amount INT)
BEGIN
    DECLARE existing_amount INT;

    SELECT amount INTO existing_amount
    FROM cart
    WHERE username = p_username AND pid = p_pid;

    IF existing_amount IS NOT NULL THEN
        IF p_new_amount > 0 THEN
            UPDATE cart
            SET amount = p_new_amount
            WHERE username = p_username AND pid = p_pid;
        ELSE
            DELETE FROM cart
            WHERE username = p_username AND pid = p_pid;
        END IF;
    END IF;
END //
DELIMITER ;

CALL AddToCart('admin', 1, 3);
CALL AddToCart('admin', 2, 2);
CALL AddToCart('admin', 3, 1);


DELIMITER //
CREATE PROCEDURE GetCart(IN p_username VARCHAR(255))
BEGIN
    SELECT c.username, c.pid, p.name, p.image, c.amount, p.price, c.amount * p.price AS total_price
    FROM cart c
    INNER JOIN products p ON c.pid = p.id
    WHERE c.username = p_username;
END //
DELIMITER ;

-- CALL GetCart('admin');


CREATE TABLE IF NOT EXISTS orders (
  id int(11) NOT NULL,
  username varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  pid int(11) NOT NULL,
  amount int(11) NOT NULL,
  address varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  phone varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  ship int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (id, username, pid),
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (pid) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELIMITER //
CREATE PROCEDURE GetOrderList(IN p_username VARCHAR(255))
BEGIN
    SELECT o.id, SUM(o.amount) AS total_amount
    FROM orders o
    WHERE o.username = p_username
    GROUP BY o.id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetOrderDetail(IN p_id INT)
BEGIN
	SELECT o.id, o.username, o.pid, p.name, p.image, o.amount, p.price, o.amount * p.price AS total_price, o.address, o.phone, o.ship
	FROM orders o
	INNER JOIN products p ON o.pid = p.id
	WHERE o.id = p_id;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE Purchase(IN p_username VARCHAR(255), IN p_address VARCHAR(255), IN p_phone VARCHAR(255), IN p_ship INT)
BEGIN
    DECLARE order_id INT;

    SELECT IFNULL(MAX(id), 0) + 1 INTO order_id FROM orders;

    INSERT INTO orders(id, username, pid, amount, address, phone, ship)
    SELECT order_id, username, pid, amount, p_address, p_phone, p_ship
    FROM cart
    WHERE username = p_username;

    DELETE FROM cart WHERE username = p_username;
END //
DELIMITER ;

-- CALL Purchase('admin');


CREATE TABLE IF NOT EXISTS comments (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  pid int(11) NOT NULL,
  username varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  comment text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  rating int(11) NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  FOREIGN KEY (username) REFERENCES users(username),
  FOREIGN KEY (pid) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

DELIMITER //
CREATE TRIGGER comment_insert
AFTER INSERT ON comments
FOR EACH ROW
BEGIN
    DECLARE avg_rating DECIMAL(2,1);

    SELECT AVG(rating) INTO avg_rating
    FROM comments
    WHERE pid = NEW.pid;

    UPDATE products
    SET rating = avg_rating
    WHERE id = NEW.pid;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER comment_delete
AFTER DELETE ON comments
FOR EACH ROW
BEGIN
    DECLARE avg_rating DECIMAL(2,1);

    SELECT AVG(rating) INTO avg_rating
    FROM comments
    WHERE pid = OLD.pid;

    UPDATE products
    SET rating = avg_rating
    WHERE id = OLD.pid;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetProductComments(IN p_pid INT)
BEGIN
    SELECT c.id, c.pid, u.name, c.comment, c.rating, c.date
    FROM comments c
    INNER JOIN users u ON c.username = u.username
    WHERE c.pid = p_pid;
END //
DELIMITER ;

DELIMITER //
CREATE FUNCTION DeleteComment(p_id INT, p_username VARCHAR(255), p_token VARCHAR(255)) RETURNS BOOLEAN
BEGIN
    DECLARE owner_username VARCHAR(255);
    DECLARE user_token VARCHAR(255);

    SELECT username INTO owner_username FROM comments WHERE id = p_id;
    SELECT token INTO user_token FROM users WHERE username = p_username;

    IF owner_username = p_username AND user_token = p_token THEN
        DELETE FROM comments WHERE id = p_id;
		RETURN TRUE;
	ELSE
		RETURN FALSE;
	END IF;
END //
DELIMITER ;

INSERT INTO comments(pid, username, comment, rating) VALUES
(1, 'lio', 'Yuri là một nền văn hóa tốt', 5),
(1, 'baodoktah', 'GL sucks', 2),
(1, 'ntc', 'Ok', 4);


CREATE TABLE IF NOT EXISTS news (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  content text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  cover varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '/img/news/default.webp'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO news (title, content, cover) VALUES
('[ĐIỂM SÁCH] BAKEMONOGATARI - THANH XUÂN "THÚ VỊ" BÊN MUÔN VÀN ĐIỀU "QUÁI GỞ"', 'Giữa thời đại của động cơ tuyến tính và tàu đệm từ trường siêu tốc, cậu nam sinh cấp ba Araragi Koyomi lại bị ma cà rồng tấn công tại một thị trấn vùng quê Nhật Bản, phải để một ông chú vô gia cư lôi thôi lếch thếch tình cờ đi ngang qua ra tay cứu giúp mới có thể thoát nạn và trở thành một thứ nửa người nửa ngợm. Và kể từ sau sự kiện mang tính “nỗi hổ thẹn đối với nhân loại hiện đại” ấy, cậu chàng với cái tên dễ líu lưỡi này liên tiếp gặp vấn đề với “quái dị” - những sự tồn tại bí ẩn sở hữu mối liên hệ vô cùng mật thiết với thế giới mà khoa học không tài nào giải thích nổi. 

Từ Cua tới Ốc Sên, hết Khỉ lại Rắn, chưa kể đến Ong, Phượng Hoàng hay Mèo... Tuy nhiên, trong họa cũng có phúc. Trải qua hàng loạt rắc rối ấy, Araragi Koyomi dần thoát khỏi kiếp tự kỉ lánh đời để kết thân với nhiều nhân vật đầy cá tính, mở ra một câu chuyện thanh xuân quái lạ, ngập tràn hài hước nhưng cũng không kém phần nhân văn, để lại trong lòng người đọc nhiều điều cần suy nghĩ.

Được phân loại là light-novel, song series Monogatari lại sở hữu một đặc điểm khá nổi bật là sử dụng rất ít tranh minh họa. Chi tiết này vốn xuất phát từ một thử nghiệm đầy tính hiếu kì - Liệu có thể làm nên một tác phẩm light-novel gần như chỉ có chữ? - của cây bút gạo cội NISIO ISIN. Thử nghiệm ấy đã thành công rực rỡ. 

Chẳng cần tới quá nhiều hình minh họa, ông vẫn dựng được nên những hình tượng nhân vật kinh điển - một cô nàng độc miệng toàn thân vũ trang bằng văn phòng phẩm, một lớp trưởng tưởng chừng hoàn hảo không tì vết, một cô nhóc tiểu học lanh lợi láu lỉnh, một đàn em xinh xắn giỏi giang nhưng lại có phần biến thái, vân vân và vân vân. Tất cả đã được ngòi bút với sở trường vẽ nên cá tính cho nhân vật qua lời thoại của NISIO ISIN khắc họa vô cùng rõ nét. 

Và khi có thêm những tấm hình minh họa tuy ít về số lượng nhưng tuyệt đỉnh về chất lượng của “Phù thủy ánh sáng” VOFAN tiếp sức, những nhân vật ấy lại như hổ mọc cánh, cùng cốt truyện đầy thú vị và hấp dẫn tạo nên một tượng đài không thể lay chuyển trong làng light-novel Nhật Bản.

Bakemonogatari nói riêng và Monogatari Series nói chung có lẽ vốn chẳng hề xa lạ với người hâm mộ Việt Nam qua các phiên bản chuyển thể giàu tính trực quan như anime hay manga. Tuy nhiên, khác với lối vận dụng hình ảnh để truyền tải và tăng thêm tính hấp dẫn cho câu chuyện của các phiên bản chuyển thể, light-novel gốc lại không quá chú trọng vào việc miêu tả các cảnh hành động/chiến đấu với “quái dị” hay quá trình khám phá/giải mã bí ẩn, mà chủ yếu tập trung vào những màn “đối đáp” đầy hài hước và xoắn não giữa các nhân vật hòng khai thác triệt để sở trường của NISIO ISIN. 

Bản thân tác giả cũng từng phát biểu rằng đây là đặc điểm khiến tác phẩm “rất khó chuyển thể”, và thực tế thì “hội thoại” chính là điểm nhấn mà các phiên bản anime hay manga, tuy đều rất nỗ lực và đạt được thành công mỹ mãn với cách thể hiện của mình, song vẫn chưa thể truyền tải trọn vẹn tới người đọc/người xem.', '/img/news/default.webp');

