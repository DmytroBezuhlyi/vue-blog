<template>
  <el-row type="flex" justify="center">
    <el-col :span="12">
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
            @click="submitForm('ruleForm')"
          >
            Login
          </el-button>
          <el-button data-test="reset" @click="resetForm('ruleForm')"
            >Reset
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class LoginPage extends Vue {
  validateEmail = (rule: any, value: string, callback: any) => {
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
          min: 3,
          max: 50,
          message: "Length should be 3 to 50",
          trigger: "blur",
        },
      ],
    };
  }

  submitForm(formName: any) {
    (this.$refs[formName] as any).validate((valid: any) => {
      if (valid) {
        if (
          this.ruleForm.email === "test@gmail.com" &&
          this.ruleForm.password === "12345"
        ) {
          const token = JSON.stringify(new Date().getTime());
          localStorage.setItem("currentUser", token);

          this.$router.push("/");
        } else {
          console.log("error submit!!");
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
