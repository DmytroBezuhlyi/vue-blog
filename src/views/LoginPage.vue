<template>
  <el-row type="flex" justify="center">
    <el-col>
      <h1>Login</h1>
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
        <el-form-item>
          <el-button
            data-test="submit"
            type="primary"
            @click="submitLoginForm('ruleForm')"
          >
            Login
          </el-button>
          <el-button data-test="reset" @click="resetForm('ruleForm')"
            >Reset
          </el-button>
        </el-form-item>
      </el-form>
      <div>
        Haven't had an account yet? Please,
        <router-link to="/registration">sing up</router-link>
      </div>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase/compat/app";

@Component
export default class LoginPage extends Vue {
  validateEmail = (rule: any, value: string, callback: any): void => {
    const validationRule = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!validationRule.test(value)) {
      callback(new Error("Please input the correct email"));
    } else {
      callback();
    }
  };
  ruleForm = {
    email: "",
    password: "",
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
      password: [
        {
          required: true,
          message: "Please enter your password",
          trigger: "blur",
        },
        {
          min: 6,
          max: 20,
          message: "Length should be 6 to 20",
          trigger: "blur",
        },
      ],
    };
  }

  submitLoginForm(formName: any) {
    (this.$refs[formName] as any).validate(async (valid: any) => {
      if (valid) {
        const formData = {
          email: this.ruleForm.email,
          password: this.ruleForm.password,
        };

        try {
          await this.$store.dispatch("login", formData);
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
<style lang="scss"></style>
