import React, { Component } from "react";
import logo from './image/logo.png';
import { Link } from 'react-router-dom';

export default class Footer extends Component {

    render() {
        return (
            <footer className="text-center w-full grid grid-cols-footer  justify-center border-t-2 border-xanhla pt-16  mb-8 mt-20  ">
                <div className="  w-full ml-32  justify-center items-center">
                    <Link to="/">  <img className="h-20   w-250 float-left" src={logo} alt="logo" /></Link>
                </div>
                <div className="   text-left grid grid-cols-3    w-full     pt-8 text-lg font-semibold  " >
                    <div className="mb-16 "><h1>Đỗ Trần Anh Khoa<br />
                        <p className="my-4"> Điện thoại: 024 7300 1866 </p>
                        Email: AnhKhoa@gmail.com.vn</h1></div>
                    <div><h1>Trần Duy Đan<br />
                        <p className="my-4">  Điện thoại: 028 7300 1866 </p>
                        Email: DuyDan@gmail.com.vn</h1></div>
                    <div><h1>Huỳnh Lê Hồng Phúc<br />
                        <p className="my-4">  Điện thoại: 0236 730 1866 </p>
                        Email: HongPhuc@gmail.com.vn</h1></div>
                    <div><h1>Thẩm Quang Minh<br />
                        <p className="my-4">  Điện thoại: 0292 730 1866 </p>
                        Email: QuangMinh@gmail.com.vn</h1></div>
                    <div><h1>Trần Tấn Tài<br />
                        <p className="my-4">   Điện thoại: 0256 730 1866 <br /> /0256 7300 999 </p>
                        Email: TaiTran@gmail.com.vn</h1></div>
                </div>
            </footer>
        );

    }
}
