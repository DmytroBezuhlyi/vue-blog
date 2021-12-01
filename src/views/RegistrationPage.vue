<template>
  <el-row type="flex" justify="center">
    <el-col :xs="24">
      <h1>Registration</h1>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Email" prop="email">
          <el-input
            data-test="email"
            type="text"
            v-model="ruleForm.email"
            autocomplete="on"
          ></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            data-test="password"
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="passwordRepeat">
          <el-input
            data-test="passwordRepeat"
            type="password"
            v-model="ruleForm.passwordRepeat"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            data-test="submit"
            type="primary"
            @click="submitRegForm('ruleForm')"
            >Sign Up
          </el-button>
          <el-button data-test="reset" @click="resetForm('ruleForm')"
            >Reset
          </el-button>
        </el-form-item>
      </el-form>
      <div>
        Do you already have an account? Please,
        <router-link to="/login">sing in</router-link>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase/compat";

@Component
export default class RegistrationPage extends Vue {
  validateEmail = (rule: any, value: string, callback: any) => {
    const validationRule = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!validationRule.test(value)) {
      callback(new Error("Please input the correct email"));
    } else {
      callback();
    }
  };
  validatePass = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("Please input the password"));
    } else if (value.length < 6 || value.length > 20) {
      callback(new Error("Length should be 6 to 20"));
    } else {
      callback();
    }
  };
  validatePassConfirm = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("Please input the password again"));
    } else if (value !== this.ruleForm.password) {
      callback(new Error("Password don't match to password entered above"));
    } else {
      callback();
    }
  };
  ruleForm = {
    email: "",
    password: "",
    passwordRepeat: "",
  };

  get rules() {
    return {
      email: [
        {
          required: true,
          message: "Please fill the email field",
          trigger: "blur",
        },
        { validator: this.validateEmail, trigger: "blur" },
      ],
      password: [{ validator: this.validatePass, trigger: "blur" }],
      passwordRepeat: [
        { validator: this.validatePassConfirm, trigger: "blur" },
      ],
    };
  }

  submitRegForm(formName: any) {
    (this.$refs[formName] as any).validate(async (valid: any) => {
      if (valid) {
        const formData = {
          email: this.ruleForm.email,
          password: this.ruleForm.password,
        };

        try {
          await this.$store.dispatch("registration", formData);
          const authUser = {
            accessToken: await firebase.auth().currentUser?.getIdToken(),
          };
          await localStorage.setItem("currentUser", JSON.stringify(authUser));

          await this.$router.push("/");
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  resetForm(formName: any): void {
    const ref: any = this.$refs[formName];
    ref.resetFields();
  }
}
</script>
<style lang="scss">
.el-form {
  @media (max-width: 990px) {
    margin: 0 50px;
  }
  @media (max-width: 768px) {
    margin: 0 50px;
  }
  @media (max-width: 768px) {
    margin: 0 50px;
  }
  @media (max-width: 576px) {
    margin: 0;
  }

  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
      width: 35% !important;
    }

    .el-form-item__content {
      flex: 1;
      margin-left: 0 !important;
    }
  }
}
</style>
