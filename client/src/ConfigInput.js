import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
class ConfigInput {
    static listControlTabMember = [
        { path: "/account/verify-account", name: "Trở thành người cho thuê", icon: <AccountCircleOutlinedIcon /> },
        { path: "/account/add-property", name: "Cho thuê nhà", icon: <AddBoxOutlinedIcon /> },
        { path: "/account/favorites", name: "Yêu thích", icon: <FavoriteBorderOutlinedIcon /> },
        { path: "/account/list-property", name: "Danh sách phòng", icon: <HomeOutlinedIcon></HomeOutlinedIcon> }
    ]
    static listControlTabAdmin = [
        { path: "/account/admin/list-account", name: "Xác nhận tài khoản", icon: <AccountCircleOutlinedIcon /> },
        { path: "/account/admin/list-real-estate", name: "Duyệt các phòng", icon: <HomeOutlinedIcon></HomeOutlinedIcon> },
        { path: "/account/admin/add-property", name: "Cho thuê nhà", icon: <AddBoxOutlinedIcon /> },
    ]
    static mapListHeadTable = {
        "tableAccount": [
            { align: "left", label: "Id" },
            { align: "left", label: "Số điện thoại" },
            { align: "left", label: "Số chứng minh thư" },
            { align: "left", label: "Địa chỉ" },
            { align: "left", label: "Ảnh cá nhân" },
            { align: "left", label: "Ảnh chứng minh thư" },
            { align: "center", label: "Hành động" },

        ],
        "tableFavo": [
            { align: "left", label: "Phòng" },
            { align: "left", label: "Trạng thái" },
            { align: "left", label: "Giá" },
            { align: "center", label: "Hành động" },
        ],
        "tableRealEstates": [
            { align: "left", label: "Phòng" },
            { align: "left", label: "Trạng thái" },
            { align: "left", label: "Giá" },
            { align: "center", label: "Hành động" },
        ],
        "tabelListProperty": [
            { align: "left", label: "Phòng" },
            { align: "left", label: "Trạng thái" },
            { align: "left", label: "Tình trạng" },
            { align: "left", label: "Giá" },
            { align: "center", label: "Hành động" },
        ]
    };
    static listTab = ["Miêu tả", "Địa chỉ", "Chi tiết", "Chú thích"]
    static mapCellTable = {
        "tableAccount": [
            { label: "id", align: "left" },
            { label: "phone", align: "left" },
            { label: "cardId", align: "left" },
            { label: "address", align: "left" },
            { label: "personImagePath", align: "left" },
            { label: "idCardImagePath", align: "left" }
        ],
        "tableFavo": [
            { label: "typeRealEstate", align: "left" },
            { label: "status", align: "left" },
            { label: "price", align: "left" },
        ],
        "tableRealEstates": [
            { align: "left", label: "isApprove" },
            { label: "price", align: "left" },

        ],
        "tabelListProperty": [
            { align: "left", label: "typeRealEstate" },
            { align: "left", label: "status" },
            { align: "left", label: "isApprove" },
            { align: "left", label: "price" },
        ]
    }
    static filterListProperty = ["All", "Đang chờ duyệt", "Bị từ chối", "Đã được duyệt"]
    static filterListRealEstate = ["All", "Đang chờ duyệt", "Bị từ chối"]

    static listInforProfile = [
        { label: "Họ", type: "text", stateName: "firstName" },
        { label: "Tên", type: "text", stateName: "lastName" },
        { label: "Email", type: "email", stateName: "email" },
        { label: "Số điện thoại", type: "number", stateName: "phone" },
    ]
    static verifyAccount = [
        { label: "Chứng minh thư", type: "number", stateName: "cardId" },
        { label: "Địa chỉ thường trú", type: "text", stateName: "address" },
    ]
    static listInputChangePassowrd = [
        { label: "Mật khẩu cũ", type: "password" },
        { label: "Mật khẩu mới", type: "password" },
        { label: "Nhập lại mật khẩu", type: "password" },
    ]
    static propertyInformationDetail = [
        { label: "Id:", value: "id" },
        { label: "Giá:", value: "price" },
        { label: "Diện tích:", value: "size" },
        { label: "Phòng tắm:", value: "bathroom" },
        { label: "Phòng ngủ:", value: "bedroom" },
        { label: "Chung chủ:", value: "isPrivate" },
        { label: "Phòng bếp:", value: "kitchenDetail" },
    ]
    static propertyDescriptionInput = [
        { label: "*Tiêu đề (Bắt buộc)", type: "text", nameState: "title" },
        { label: "Miêu tả", type: "text", nameState: "description" }
    ]
    static propertyPrice = [
        { label: "Giá", type: "number", nameState: "price" },
        { label: "Tính theo", type: "select", value: ["Tháng", "Quý", "Năm"], nameState: "pricePer" },
        { label: "Tiền điện(Đồng/kWh)", type: "number", nameState: "electricPrice" },
        { label: "Tiền nước (Đồng/m3)", type: "number", nameState: "waterPrice" },
    ]
    static selectPrice = ["Từ 15m2-25m2", "Từ 25m2-40m2", "Từ 40m2-50m2", "Từ 50m2 trở lên",]
    static listState = ["An Giang", "Bà Rịa – Vũng Tàu", "Bình Dương", "Bình Phước", "Bình Thuận", "Bình Định", "Bạc Liêu", "Bắc Giang", "Bắc Kạn", "Bắc Ninh", "Bến Tre", "Cao Bằng", "Cà Mau", "Cần Thơ", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hòa Bình", "Hưng Yên", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hồ Chí Minh", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Long An", "Lào Cai", "Lâm Đồng", "Lạng Sơn", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Thanh Hóa", "Thái Bình", "Thái Nguyên", "Thừa Thiên - Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Tây Ninh", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái", "Điện Biên", "Đà Nẵng", "Đăk Nông", "Đắk Lắk", "Đồng Nai", "Đồng Tháp"]
    static mapDistrict = {
        "Hà Nội": [
            "Quận Ba Đình",
            "Thị xã Sơn Tây",
            "Quận Hoàn Kiếm",
            "Huyện Ba Vì",
            "Quận Hai Bà Trưng",
            "Huyện Phúc Thọ",
            "Quận Đống Đa",
            "Huyện Thạch Thất",
            "Quận Tây Hồ",
            "Huyện Quốc Oai",
            "Quận Cầu Giấy",
            "Huyện Chương Mỹ",
            "Quận Thanh Xuân",
            "Huyện Đan Phượng",
            "Quận Hoàng Mai",
            "Huyện Hoài Đức",
            "Quận Long Biên",
            "Huyện Thanh Oai",
            "Quận Bắc Từ Liêm",
            "Huyện Mỹ Đức",
            "Huyện Thanh Trì",
            "Huyện Ứng Hòa",
            "Huyện Gia Lâm",
            "Huyện Thường Tín",
            "Huyện Đông Anh",
            "Huyện Phú Xuyên",
            "Huyện Sóc Sơn",
            "Huyện Mê Linh",
            "Quận Hà Đông",
            "Quận Nam Từ Liêm"
        ],
        "Hồ chí Minh": [
            "Quận 1",
            "Quận Gò Vấp",
            "Quận 2",
            "Quận Tân Bình",
            "Quận 3",
            "Quận Tân Phú",
            "Quận 4",
            "Quận Bình Thạnh",
            "Quận 5",
            "Quận Phú Nhuận",
            "Quận 6",
            "Quận Thủ Đức",
            "Quận 7",
            "Quận Bình Tân",
            "Quận 8",
            "Huyện Bình Chánh",
            "Quận 9",
            "Huyện Củ Chi",
            "Quận 10",
            "Huyện Hóc Môn",
            "Quận 11",
            "Huyện Nhà Bè",
            "Quận 12",
            "Huyện Cần Giờ"
        ],
        "Hải Phòng": [
            "Quận Hồng Bàng",
            "Huyện Thủy Nguyên",
            "Quận Lê Chân",
            "Huyện An Dương",
            "Quận Ngô Quyền",
            "Huyện Tiên Lãng",
            "Quận Kiến An",
            "Huyện Vĩnh Bảo",
            "Quận Hải An",
            "Huyện Cát Hải",
            "Quận Đồ Sơn",
            "Huyện Bạch Long Vĩ",
            "Huyện An Lão",
            "Quận Dương Kinh",
            "Huyện Kiến Thụy"
        ],
        "Đà Nẵng": [
            "Quận Hải Châu",
            "Quận Liên Chiểu",
            "Quận Thanh Khê",
            "Huyện Hòa Vang",
            "Quận Sơn Trà",
            "Quận Cẩm Lệ",
            "Quận Ngũ Hành Sơn",
            "Huyện Hoàng Sa"
        ],
        "Hà Giang": [
            "Thành phố Hà Giang",
            "Huyện Bắc Mê",
            "Huyện Đồng Văn",
            "Huyện Hoàng Su Phì",
            "Huyện Mèo Vạc",
            "Huyện Xín Mần",
            "Huyện Yên Minh",
            "Huyện Bắc Quang",
            "Huyện Quản Bạ",
            "Huyện Quang Bình",
            "Huyện Vị Xuyên",
            "Huyện Bắc Mê"
        ],
        "Cao Bằng": [
            "Thành phố Cao Bằng",
            "Huyện Hòa An",
            "Huyện Bảo Lạc",
            "Huyện Quảng Uyên",
            "Huyện Thông Nông",
            "Huyện Thạch An",
            "Huyện Hà Quảng",
            "Huyện Hạ Lang",
            "Huyện Trà Lĩnh",
            "Huyện Bảo Lâm",
            "Huyện Trùng Khánh",
            "Huyện Phục Hòa",
            "Huyện Nguyên Bình",
            "Huyện Hòa An"
        ],
        "Lai Châu": [
            "Thành Phố Lai Châu",
            "Huyện Mường Tè",
            "Huyện Tam Đường",
            "Huyện Than Uyên",
            "Huyện Phong Thổ",
            "Huyện Tân Uyên",
            "Huyện Sìn Hồ",
            "Huyện Nậm Nhùn"
        ],
        "Lào Cao": [
            "Huyện Bảo Thắng",
            "Huyện Mường Khương",
            "Huyện Bảo Yên",
            "Huyện Sa Pa",
            "Huyện Bát Xát",
            "Huyện Si Ma Cai",
            "Huyện Bắc Hà",
            "Huyện Văn Bàn",
            "Thành phố Lào Cai"
        ],
        "Tuyên Quang": [
            "Thành phố Tuyên Quang",
            "Huyện Hàm Yên",
            "Huyện Lâm Bình",
            "Huyện Yên Sơn",
            "Huyện Na Hang",
            "Huyện Sơn Dương",
            "Huyện Chiêm Hóa"
        ],
        "Lạng Sơn": [
            "Thành phố Lạng Sơn",
            "Huyện Cao Lộc",
            "Huyện Tràng Định",
            "Huyện Lộc Bình",
            "Huyện Bình Gia",
            "Huyện Chi Lăng",
            "Huyện Văn Lãng",
            "Huyện Đình Lập",
            "Huyện Bắc Sơn",
            "Huyện Hữu Lũng",
            "Huyện Văn Quan"
        ],
        "Bắc Kạn": [
            "Thành phố Bắc Kạn",
            "Huyện Ngân Sơn",
            "Huyện Chợ Đồn",
            "Huyện Ba Bể",
            "Huyện Bạch Thông",
            "Huyện Chợ Mới",
            "Huyện Na Rì",
            "Huyện Pác Nặm"
        ],
        "Thái Nguyên": [
            "Thành phố Thái Nguyên",
            "Huyện Đại Từ",
            "Thành phố Sông Công",
            "Huyện Đồng Hỷ",
            "Huyện Định Hóa",
            "Huyện Phú Bình",
            "Huyện Phú Lương",
            "Thị xã Phổ Yên",
            "Huyện Võ Nhai"
        ],
        "Yên Bái": [
            "Thành phố Yên Bái",
            "Huyện Văn Chấn",
            "Thị xã Nghĩa Lộ",
            "Huyện Trấn Yên",
            "Huyện Văn Yên",
            "Huyện Trạm Tấu",
            "Huyện Yên Bình",
            "Huyện Lục Yên",
            "Huyện Mù Cang Chải"
        ],
        "Sơn La": [
            "Thành phố Sơn La",
            "Huyện Mai Sơn",
            "Huyện Quỳnh Nhai",
            "Huyện Yên Châu",
            "Huyện Mường La",
            "Huyện Sông Mã",
            "Huyện Thuận Châu",
            "Huyện Mộc Châu",
            "Huyện Bắc Yên",
            "Huyện Sốp Cộp",
            "Huyện Phù Yên",
            "Huyện Vân Hồ"
        ],
        "Phú Thọ": [
            "Thành phố Việt Trì",
            "Huyện Thanh Sơn",
            "Thị xã Phú Thọ",
            "Huyện Phù Ninh",
            "Huyện Đoan Hùng",
            "Huyện Lâm Thao",
            "Huyện Thanh Ba",
            "Huyện Tam Nông",
            "Huyện Hạ Hòa",
            "Huyện Thanh Thủy",
            "Huyện Cẩm Khê",
            "Huyện Tân Sơn",
            "Huyện Yên Lập"
        ],
        "Vĩnh Phúc": [
            "Thành phố Vĩnh Yên",
            "Huyện Bình Xuyên",
            "Huyện Tam Dương",
            "Huyện Sông Lô",
            "Huyện Lập Thạch",
            "Thị xã Phúc Yên",
            "Huyện Vĩnh Tường",
            "Huyện Tam Đảo",
            "Huyện Yên Lạc"
        ],
        "Quảng Ninh": [
            "Thành phố Hạ Long",
            "Huyện Tiên Yên",
            "Thành phố Cẩm Phả",
            "Huyện Ba Chẽ",
            "Thành phố Uông Bí",
            "Thị xã Đông Triều",
            "Thành phố Móng Cái",
            "Thị xã Quảng Yên",
            "Huyện Bình Liêu",
            "Huyện Hoành Bồ",
            "Huyện Đầm Hà",
            "Huyện Vân Đồn",
            "Huyện Hải Hà",
            "Huyện Cô Tô"
        ],
        "Bắc Giang": [
            "Thành phố Bắc Giang",
            "Huyện Tân Yên",
            "Huyện Yên Thế",
            "Huyện Hiệp Hòa",
            "Huyện Lục Ngạn",
            "Huyện Lạng Giang",
            "Huyện Sơn Động",
            "Huyện Việt Yên",
            "Huyện Lục Nam",
            "Huyện Yên Dũng"
        ],
        "Bắc Ninh": [
            "Thành phố Bắc Ninh",
            "Thị xã Từ  Sơn",
            "Huyện Yên Phong",
            "Huyện Thuận Thành",
            "Huyện Quế Võ",
            "Huyện Gia Bình",
            "Huyện Tiên Du",
            "Huyện Lương Tài"
        ],
        "Hải Dương": [
            "Thành phố Hải Dương",
            "Huyện Thanh Miện",
            "Thị xã Chí Linh",
            "Huyện Ninh Giang",
            "Huyện Nam Sách",
            "Huyện Cẩm Giàng",
            "Huyện Kinh Môn",
            "Huyện Thanh Hà",
            "Huyện Gia Lộc",
            "Huyện Kim Thành",
            "Huyện Tứ Kỳ",
            "Huyện Bình Giang"
        ],
        "Hưng Yên": [
            "Thành phố Hưng Yên",
            "Huyện Tiên Lữ",
            "Huyện Kim Động",
            "Huyện Phù Cừ",
            "Huyện Ân Thi",
            "Huyện Mỹ Hào",
            "Huyện KHóai Châu",
            "Huyện Văn Lâm",
            "Huyện Yên Mỹ",
            "Huyện Văn Giang"
        ],
        "Hòa Bình": [
            "Thành phố Hòa Bình",
            "Huyện Lương Sơn",
            "Huyện Đà Bắc",
            "Huyện Kim Bôi",
            "Huyện Mai Châu",
            "Huyện Lạc Thủy",
            "Huyện Tân Lạc",
            "Huyện Yên Thủy",
            "Huyện Lạc Sơn",
            "Huyện Cao Phong",
            "Huyện Kỳ Sơn"
        ],
        "Hà Nam": [
            "Thành phố Phủ Lý",
            "Huyện Lý Nhân",
            "Huyện Duy Tiên",
            "Huyện Thanh Liêm",
            "Huyện Kim Bảng",
            "Huyện Bình Lục"
        ],
        "Nam Định": [
            "Thành phố Nam Định",
            "Huyện Vụ Bản",
            "Huyện Mỹ Lộc",
            "Huyện Nam Trực",
            "Huyện Xuân Trường",
            "Huyện Trực Ninh",
            "Huyện Giao Thủy",
            "Huyện Nghĩa Hưng",
            "Huyện ý Yên",
            "Huyện Hải Hậu"
        ],
        "Nghệ An": [
            "Thành phố Vinh",
            "Huyện Diễn Châu",
            "Thị xã Cửa Lò",
            "Huyện Anh Sơn",
            "Huyện Quỳ Châu",
            "Huyện Đô Lương",
            "Huyện Quỳ Hợp",
            "Huyện Thanh Chương",
            "Huyện Nghĩa Đàn",
            "Huyện Nghi Lộc",
            "Huyện Quỳnh Lưu",
            "Huyện Nam Đàn",
            "Huyện Kỳ Sơn",
            "Huyện Hưng Nguyên",
            "Huyện Tương Dương",
            "Huyện Quế Phong",
            "Huyện Con Cuông",
            "Thị Xã Thái Hòa",
            "Huyện Tân Kỳ",
            "Thị Xã Hoàng Mai",
            "Huyện Yên Thành"
        ],
        "Thái Bình": [
            "Thành phố Thái Bình",
            "Huyện Vũ Thư",
            "Huyện Quỳnh Phụ",
            "Huyện Kiến Xương",
            "Huyện Hưng Hà",
            "Huyện Tiền Hải",
            "Huyện Đông Hưng",
            "Huyện Thái Thụy"
        ],
        "Ninh Bình": [
            "Thành phố Ninh Bình",
            "Huyện Hoa Lư",
            "Thành phố Tam Điệp",
            "Huyện Yên Mô",
            "Huyện Nho Quan",
            "Huyện Kim Sơn",
            "Huyện Gia Viễn",
            "Huyện Yên Khánh"
        ],
        "Thanh Hóa": [
            "Thành phố Thanh Hóa",
            "Huyện Thọ Xuân",
            "Thị xã Bỉm Sơn",
            "Huyện Vĩnh Lộc",
            "Thị xã Sầm Sơn",
            "Huyện Thiệu Hóa",
            "Huyện Quan Hóa",
            "Huyện Triệu Sơn",
            "Huyện Quan Sơn",
            "Huyện Nông Cống",
            "Huyện Mường Lát",
            "Huyện Đông Sơn",
            "Huyện Bá Thước",
            "Huyện Hà Trung",
            "Huyện Thường Xuân",
            "Huyện Hoằng Hóa",
            "Huyện Như Xuân",
            "Huyện Nga Sơn",
            "Huyện Như Thanh",
            "Huyện Hậu Lộc",
            "Huyện Lang Chánh",
            "Huyện Quảng Xương",
            "Huyện Ngọc Lặc",
            "Huyện Tĩnh Gia",
            "Huyện Thạch Thành",
            "Huyện Yên Định",
            "Huyện Cẩm Thủy"
        ],
        "Hà Tĩnh": [
            "Thành phố Hà Tĩnh",
            "Huyện Thạch Hà",
            "Thị xã Hồng Lĩnh",
            "Huyện Cẩm Xuyên",
            "Huyện Hương Sơn",
            "Huyện Kỳ Anh",
            "Huyện Đức Thọ",
            "Huyện Vũ Quang",
            "Huyện Nghi Xuân",
            "Huyện Lộc Hà",
            "Huyện Can Lộc",
            "Thị xã Kỳ Anh",
            "Huyện Hương Khê"
        ],
        "Quảng Bình": [
            "Thành phố Đồng Hới",
            "Huyện Bố Trạch",
            "Huyện Tuyên Hóa",
            "Huyện Quảng Ninh",
            "Huyện Minh Hóa",
            "Huyện Lệ Thủy",
            "Huyện Quảng Trạch",
            "Thị xã Ba Đồn"
        ],
        "Quảng Trị": [
            "Thành phố Đông Hà",
            "Huyện Triệu Phong",
            "Thị xã Quảng Trị",
            "Huyện Hải Lăng",
            "Huyện Vĩnh Linh",
            "Huyện Hướng Hóa",
            "Huyện Gio Linh",
            "Huyện Đakrông",
            "Huyện Cam Lộ",
            "Huyện đảo Cồn Cỏ"
        ],
        "Thừa thiên - Huế": [
            "Thành phố Huế",
            "Thị xã Hương Thủy",
            "Huyện Phong Điền",
            "Huyện Phú Lộc",
            "Huyện Quảng Điền",
            "Huyện Nam Đông",
            "Thị xã Hương Trà",
            "Huyện A Lưới",
            "Huyện Phú Vang"
        ],
        "Quảng Nam": [
            "Thành phố Tam Kỳ",
            "Huyện Tiên Phước",
            "Thành phố Hội An",
            "Huyện Bắc Trà My",
            "Huyện Duy Xuyên",
            "Huyện Đông Giang",
            "Thị xã Điện Bàn",
            "Huyện Nam Giang",
            "Huyện Đại Lộc",
            "Huyện Phước Sơn",
            "Huyện Quế Sơn",
            "Huyện Nam Trà My",
            "Huyện Hiệp Đức",
            "Huyện Tây Giang",
            "Huyện Thăng Bình",
            "Huyện Phú Ninh",
            "Huyện Núi Thành",
            "Huyện Nông Sơn"
        ],
        "Quảng Ngãi": [
            "Huyện Bình Sơn",
            "Huyện Ba Tơ",
            "Huyện Sơn Tịnh",
            "Huyện Minh Long",
            "Thành phố Quảng Ngãi",
            "Huyện Sơn Hà",
            "Huyện Tư Nghĩa",
            "Huyện Sơn Tây",
            "Huyện Nghĩa Hành",
            "Huyện Trà Bồng",
            "Huyện Mộ Đức",
            "Huyện Tây Trà",
            "Huyện Đức phổ",
            "Huyện Lý Sơn"
        ],
        "Kon Tum": [
            "Thành phố Kon Tum",
            "Huyện Kon Plông",
            "Huyện ĐĂK GLEI",
            "Huyện Đăk Hà",
            "Huyện Ngọc Hồi",
            "Huyện Kon Rẫy",
            "Huyện Đăk Tô",
            "Huyện Tu Mơ Rông",
            "Huyện Sa Thầy",
            "Huyện IA H'DRAI"
        ],
        "Bình Định": [
            "Thành phố Quy Nhơn",
            "Huyện Vĩnh Thạnh",
            "Huyện An Lão",
            "Huyện Tây Sơn",
            "Huyện Hoài Ân",
            "Huyện Vân Canh",
            "Huyện Hoài Nhơn",
            "Thị xã An Nhơn",
            "Huyện Phù Mỹ",
            "Huyện Tuy Phước",
            "Huyện Phù Cát"
        ],
        "Gia Lai": [
            "Thành phố Pleiku",
            "Thị xã Ayun Pa",
            "Huyện Chư Păh",
            "Huyện Krông Pa",
            "Huyện Mang Yang",
            "Huyện Ia Grai",
            "Huyện KBang",
            "Huyện Đak Đoa",
            "Thị xã An Khê",
            "Huyện Ia Pa",
            "Huyện Kông Chro",
            "Huyện Đak Pơ",
            "Huyện Đức Cơ",
            "Huyện Phú Thiện",
            "Huyện Chư Prông",
            "Huyện Chư Pưh",
            "Huyện Chư Sê"
        ],
        "Phú Yên": [
            "Thành phố Tuy Hòa",
            "Huyện Sông Hinh",
            "Huyện Đồng Xuân",
            "Huyện Đông Hòa",
            "Thị Xã Sông Cầu",
            "Huyện Phú Hòa",
            "Huyện Tuy An",
            "Huyện Tây Hòa",
            "Huyện Sơn Hòa"
        ],
        "Đắk Lắk": [
            "Th.phố Buôn Ma Thuột",
            "Huyện M'Đrắk",
            "Huyện Ea H'Leo",
            "Huyện Krông Ana",
            "Huyện Krông Buk",
            "Huyện Krông Bông",
            "Huyện Krông Năng",
            "Huyện Lắk",
            "Huyện Ea Súp",
            "Huyện Buôn Đôn",
            "Huyện Cư M'gar",
            "Huyện Cư Kuin",
            "Huyện Krông Pắc",
            "Thị Xã Buôn Hồ",
            "Huyện Ea Kar"
        ],
        "Khánh Hòa": [
            "Thành phố Nha Trang",
            "Thành phố Cam Ranh",
            "Huyện Vạn Ninh",
            "Huyện Khánh Sơn",
            "Thị xã Ninh Hòa",
            "Huyện đảo Trường Sa",
            "Huyện Diên Khánh",
            "Huyện Cam Lâm",
            "Huyện Khánh Vĩnh"
        ],
        "Lâm Đồng": [
            "Thành phố Đà Lạt",
            "Huyện Đạ Huoai",
            "Thành phố Bảo Lộc",
            "Huyện Đạ Tẻh",
            "Huyện Đức Trọng",
            "Huyện Cát Tiên",
            "Huyện Di Linh",
            "Huyện Lâm Hà",
            "Huyện Đơn Dương",
            "Huyện Bảo Lâm",
            "Huyện Lạc Dương",
            "Huyện Đam Rông"
        ],
        "Bình Phước": [
            "Thị xã Đồng Xoài",
            "Thị xã Phước Long",
            "Huyện Đồng Phú",
            "Huyện Bù Đăng",
            "Huyện Chơn Thành",
            "Huyện Hớn Quản",
            "Thị xã Bình Long",
            "Huyện Bù Gia Mập",
            "Huyện Lộc Ninh",
            "Huyện Phú Riềng",
            "Huyện Bù Đốp"
        ],
        "Bình Dương": [
            "Th. phố Thủ Dầu Một",
            "Huyện Phú Giáo",
            "Thị xã Bến Cát",
            "Huyện Dầu Tiếng",
            "Thị xã Tân Uyên",
            "Huyện Bắc Tân Uyên",
            "Thị xã Thuận An",
            "Huyện Bàu Bàng",
            "Thị xã Dĩ An",
            "Huyện Phú Giáo"
        ],
        "Ninh Thuận": [
            "Thành phố Phan Rang -Tháp Chàm",
            "Huyện Bác Ái",
            "Huyện Ninh Sơn",
            "Huyện Thuận Bắc",
            "Huyện Ninh Hải",
            "Huyện Thuận Nam",
            "Huyện Ninh Phước"
        ],
        "Tây Ninh": [
            "Thành phố Tây Ninh",
            "Huyện Hòa Thành",
            "Huyện Tân Biên",
            "Huyện Bến Cầu",
            "Huyện Tân Châu",
            "Huyện Gò Dầu",
            "Huyện Dương Minh Châu",
            "Huyện Trảng Bàng",
            "Huyện Châu Thành"
        ],
        "Bình Thuận": [
            "Huyện Tuy Phong",
            "Huyện Đức Linh",
            "Huyện Bắc Bình",
            "Huyện Tánh Linh",
            "Huyện Hàm Thuận Bắc",
            "Huyện đảo Phú Quý",
            "Huyện Hàm Thuận Nam",
            "Thị xã La Gi"
        ],
        "Đồng Nai": [
            "Thành phố Biên Hòa",
            "Huyện Xuân Lộc",
            "Huyện Vĩnh Cửu",
            "Huyện Long Thành",
            "Huyện Tân Phú",
            "Huyện Nhơn Trạch",
            "Huyện Định Quán",
            "Huyện Trảng Bom",
            "Huyện Thống Nhất",
            "Huyện Cẩm Mỹ",
            "Thị xã Long Khánh"
        ],
        "Long An": [
            "Thành phố Tân An",
            "Huyện Thủ Thừa",
            "Huyện Vĩnh Hưng",
            "Huyện Châu Thành",
            "Huyện Mộc Hóa",
            "Huyện Tân Trụ",
            "Huyện Tân Thạnh",
            "Huyện Cần Đước",
            "Huyện Thạnh Hóa",
            "Huyện Cần Giuộc",
            "Huyện Đức Huệ",
            "Huyện Tân Hưng",
            "Huyện Đức Hòa",
            "Thị xã Kiến Tường",
            "Huyện Bến Lức"
        ],
        "Đồng Tháp": [
            "Huyện Châu Thành",
            "Huyện Tháp Mười",
            "Huyện Lai Vung",
            "Huyện Tam Nông",
            "Huyện Lấp Vò",
            "Huyện Thanh Bình",
            "Thành phố Sa Đéc",
            "Thị xã Hồng Ngự",
            "Thành phố Cao Lãnh",
            "Huyện Hồng Ngự",
            "Huyện Cao Lãnh",
            "Huyện Tân Hồng"
        ],
        "An Giang": [
            "Thành phố Long Xuyên",
            "Huyện Tri Tôn",
            "Thành phố Châu Đốc",
            "Huyện Châu Phú",
            "Huyện An Phú",
            "Huyện Chợ Mới",
            "Thị xã Tân Châu",
            "Huyện Châu Thành",
            "Huyện Phú Tân",
            "Huyện Thoại Sơn",
            "Huyện Tịnh Biên"
        ],
        "Tiền Giang": [
            "Thành phố Vũng Tàu",
            "Huyện Côn Đảo",
            "Thành phố Bà Rịa",
            "Huyện Tân Thành",
            "Huyện Xuyên Mộc",
            "Huyện Châu Đức",
            "Huyện Long Điền",
            "Huyện Đất Đỏ"
        ],
        "Kiên Giang": [
            "Thành phố Mỹ Tho",
            "Huyện Gò Công Tây",
            "Thị xã Gò Công",
            "Huyện Gò Công Đông",
            "Huyện Cái Bè",
            "Huyện Tân Phước",
            "Huyện Cai Lậy",
            "Huyện Tân Phú Đông",
            "Huyện Châu Thành",
            "Thị xã Cai Lậy",
            "Huyện Chợ Gạo"
        ],
        "Cần Thơ": [
            "Thành phố Rạch Giá",
            "Huyện An Biên",
            "Thị xã Hà Tiên",
            "Huyện An Minh",
            "Huyện Kiên Lương",
            "Huyện Vĩnh Thuận",
            "Huyện Hòn Đất",
            "Huyện Phú Quốc",
            "Huyện Tân Hiệp",
            "Huyện Kiên Hải",
            "Huyện Châu Thành",
            "Huyện U Minh Thượng",
            "Huyện Giồng Riềng",
            "Huyện Giang Thành",
            "Huyện Gò Quao"
        ],
        "Bến Tre": [
            "Quận Ninh Kiều",
            "Huyện Cờ Đỏ",
            "Quận Bình Thủy",
            "Huyện Vĩnh Thạnh",
            "Quận Cái Răng",
            "Quận Thốt Nốt",
            "Quận Ô Môn",
            "Huyện Thới Lai",
            "Huyện Phong Điền"
        ],
        "Vĩnh Long": [
            "Thành phố Bến Tre",
            "Huyện Bình Đại",
            "Huyện Châu Thành",
            "Huyện Ba Tri",
            "Huyện Chợ Lách",
            "Huyện Thạnh Phú",
            "Huyện Mỏ Cày Bắc",
            "Huyện Mỏ Cày Nam",
            "Huyện Giồng Trôm"
        ],
        "Trà Vinh": [
            "Thành phố Vĩnh Long",
            "Huyện Tam Bình",
            "Huyện Long Hồ",
            "Huyện Trà Ôn",
            "Huyện Mang Thít",
            "Huyện Vũng Liêm",
            "Thị xã Bình Minh",
            "Huyện Bình Tân"
        ],
        "Sóc Trăng": [
            "Thành phố Trà Vinh",
            "Huyện Trà Cú",
            "Huyện Càng Long",
            "Huyện Cầu Ngang",
            "Huyện Cầu Kè",
            "Huyện Duyên Hải",
            "Huyện Tiểu Cần",
            "Thị xã Duyên Hải",
            "Huyện Châu Thành"
        ],
        "Bạc Liêu": [
            "Thành phố Sóc Trăng",
            "Thị xã Vĩnh Châu",
            "Huyện Kế Sách",
            "Huyện Cù Lao Dung",
            "Huyện Mỹ Tú",
            "Thị xã Ngã Năm",
            "Huyện Mỹ Xuyên",
            "Huyện Châu Thành",
            "Huyện Thạnh Trị",
            "Huyện Trần Đề",
            "Huyện Long Phú"
        ],
        "Cà Mau": [
            "Thành phố Bạc Liêu",
            "Huyện Phước Long",
            "Huyện Vĩnh Lợi",
            "Huyện Đông Hải",
            "Huyện Hồng Dân",
            "Huyện Hòa Bình",
            "Thị xã Giá Rai"
        ],
        "Điện Biên": [
            "Thành phố Cà Mau",
            "Huyện Đầm Dơi",
            "Huyện Thới Bình",
            "Huyện Ngọc Hiển",
            "Huyện U Minh",
            "Huyện Năm Căn",
            "Huyện Trần Văn Thời",
            "Huyện Phú Tân",
            "Huyện Cái Nước"
        ],
        "Đăk Nông": [
            "Thành phố Điện Biên Phủ",
            "Huyện Tủa Chùa",
            "Thị xã Mường Lay",
            "Huyện Điện Biên Đông",
            "Huyện Điện Biên",
            "Huyện Mường Nhé",
            "Huyện Tuần Giáo",
            "Huyện Mường ảng",
            "Huyện Mường Chà",
            "Huyện Nậm Pồ"
        ],
        "Hậu Giang": [
            "Thị xã Gia Nghĩa",
            "Huyện Đăk Song",
            "Huyện Đăk R'Lấp",
            "Huyện Krông Nô",
            "Huyện Đăk Mil",
            "Huyện Đăk GLong",
            "Huyện Cư Jút",
            "Huyện Tuy Đức"
        ]
    }
    static listDetails = [
        { label: "Diện tích (m2)", type: "number", nameState: "size" },
        { label: "Số phòng Ngủ", type: "number", nameState: "bedroom" },
        { label: "Số phòng Tắm", type: "number", nameState: "bathroom" },
    ]
}
export default ConfigInput