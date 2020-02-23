<template>
  <el-dialog title="用户注册" center width="603px" :visible.sync="dialogFormVisible">
    <el-form ref="regForm" :model="form" :rules="rules">
      <el-form-item prop="avatar" label="头像" :label-width="formLabelWidth">
        <el-upload
          v-model="form.avatar"
          name="image"
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item prop="name" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input show-password v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item prop="imgCode" label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.imgCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img class="img_code" @click="getNewCode" :src="imgCodeURL" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item prop="rcode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <el-button
              :disabled="sec !=0"
              @click="getPhoneCode"
            >{{ sec == 0 ? '获取用户验证码' : '还有' + sec + '秒' }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="doRegister">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
// 接收获取验证码的方法
import { sendSMS,register } from "@/api/register";
export default {
  name:'reg',
  data() {
    return {
      //要上传图片的接口地址
      uploadUrl: process.env.VUE_APP_PicURL + "/uploads",
      //上传后图片的临时路径
      imageUrl: "",
      //倒计时秒数，默认为0
      sec: 0,
      //获取图片验证码
      imgCodeURL: process.env.VUE_APP_PicURL + "/captcha?type=sendsms",

      dialogTableVisible: false,
      //控制对话框是否显示
      dialogFormVisible: false,
      //设置文字宽度
      formLabelWidth: "120px",
      //   跟表单元素绑定的对象
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        imgCode: "",
        rcode: "",
        avatar:""
      },
      //   规则对象
      rules: {
        avatar: [
          { required: true, message: "头像不能为空", trigger: "change" }
        ],
        //图片验证码规则
        imgCode: [
          { required: true, message: "图片验证码不能为空", trigger: "blur" },
          { min:4, max:4, message: "图片验证码只能是4位", trigger: "blur" }
        ],
        rcode:[
          {required: true, message: "手机验证码不能为空", trigger: "blur"},
          { min:4, max:4, message: "手机验证码只能是4位", trigger: "blur" }
        ],
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            pattern: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
            message: "请输入正确的邮箱格式",
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/,
            message: "请输入正确的手机号格式",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 14,
            message: "密码长度在 6 到 14 个字符",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //表单确定点击事件
    doRegister() {
      this.$refs.regForm.validate(v => {
        if (v) {
          register({
            username:this.form.name,
            phone:this.form.phone,
            email:this.form.email,
            avatar:this.form.avatar,
            password:this.form.password,
            rcode:this.form.rcode
          })
          .then(res=>{
            // window.console.log(res);
            if(res.data.code == 200){
              //注册成功,关闭对话框并重置表单
              this.$message.success('注册成功!');
              this.$refs.regForm.resetFields();
              //img不是表单元素，手动把它设置为空
              this.imageUrl = "";
              this.dialogFormVisible = false;
            }else{
              //注册失败,抛出问题
              this.$message.error(res.data.message);
            }
          })
        }
      });
    },
    //验证码的点击事件
    getNewCode() {
      this.imgCodeURL =
        process.env.VUE_APP_PicURL +
        "/captcha?type=sendsms" +
        "&t" +
        Math.random() * 999;
    },
    // 上传组件的方法
    // 上传成功调用的方法
    handleAvatarSuccess(res, file) {
      window.console.log(res)
      this.imageUrl = URL.createObjectURL(file.raw);
      // 给本地的图片路径赋值
      this.form.avatar = res.data.file_path;
      // 为上传头像做一次单独的表单验证
      this.$refs.regForm.validateField('avatar');
    },
    //上传之前调用的方法
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //获取手机验证码的点击事件
    getPhoneCode() {
      //判断手机号是否合法
      if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          this.form.phone
        )
      ) {
        return this.$message.error("手机号码格式不正确");
      }

      //判断验证码长度
      if (this.form.imgCode.length !== 4) {
        return this.$message.error("验证码不正确");
      }

      this.sec = 60;
      //写一个每隔一秒触发的计时器
      let timeID = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timeID);
        }
      }, 1000);

      //发送axios请求
      // axios({
      //   url: process.env.VUE_APP_PicURL + "/sendsms",
      //   method: "post",
      //   data: {
      //     phone: this.form.phone,
      //     code: this.form.imgCode
      //   },
      //   //允许携带cookie
      //   withCredentials: true
      // }).then(res => {
      //   //成功回调
      //   console.log(res);

      //   if (res.data.code == 200) {
      //     //获取验证码成功
      //     // alert("获取验证码成功,验证码为" + res.data.data.captcha);
      //     this.$message.success("验证码为"+ res.data.data.captcha)
      //   } else {
      //     // alert(res.data.message);
      //     this.$message.error(res.data.message)
      //   }
      // });
      sendSMS({
        phone: this.form.phone,
        code: this.form.imgCode
      }).then(res => {
        //成功回调
        console.log(res);

        if (res.data.code == 200) {
          //获取验证码成功
          // alert("获取验证码成功,验证码为" + res.data.data.captcha);
          this.$message.success("验证码为" + res.data.data.captcha);
        } else {
          // alert(res.data.message);
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>
    
<style lang="less">
.el-dialog__header {
  background: linear-gradient(to right, #07bafc, #1791fd);

  .el-dialog__title {
    color: #fff;
    font-size: 17px;
  }
}
.img_code {
  width: 100%;
  height: 41px;
  vertical-align: top;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>