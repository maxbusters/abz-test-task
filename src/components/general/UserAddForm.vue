<template>
  <div class="signup__container">
    <div class="signup__wrapper">
      <div v-if="!userAdded" class="signup__form form">
        <div class="form__input input">
          <div
            class="input__field"
            :class="name.isValid ? '' : 'input__field--not-valid'"
          >
            <span class="input__label" v-show="name">Name</span>
            <input type="text" placeholder="Your name" v-model="name.value" />
          </div>
          <span class="input__error" v-show="!name.isValid">{{
            name.currErr
          }}</span>
        </div>
        <div class="form__input input">
          <div
            class="input__field"
            :class="email.isValid ? '' : 'input__field--not-valid'"
          >
            <span class="input__label" v-show="email">Email</span>
            <input type="email" placeholder="Email" v-model="email.value" />
          </div>
          <span class="input__error" v-show="!email.isValid">{{
            email.currErr
          }}</span>
        </div>
        <div class="form__input input" id="phone">
          <div
            class="input__field"
            :class="phone.isValid ? '' : 'input__field--not-valid'"
          >
            <span class="input__label" v-show="phone">Phone</span>
            <input
              type="tel"
              placeholder="Phone"
              name="phone"
              v-mask="phoneMask"
              v-model="phone.value"
            />
          </div>
          <span class="input__helper" v-show="phone.isValid"
            >+38 (XXX) XXX - XX - XX</span
          >
          <span class="input__error" v-show="!phone.isValid">{{
            phone.currErr
          }}</span>
        </div>
        <div class="form__radios radios">
          <h3 class="radios__title">Select your position</h3>
          <div
            v-for="(position, inx) in positions"
            :key="inx"
            class="radios__el el"
          >
            <label class="el__container">
              <span class="el__name">{{ position.name }}</span>
              <input
                type="radio"
                name="position"
                :checked="inx === 0"
                :value="position.id"
                v-model="positionId"
              />
              <span class="el__checkmark"></span>
            </label>
          </div>
        </div>
        <label for="file" class="form__upload-label">
          <div
            class="form__upload upload"
            :class="image.isValid ? '' : 'upload--not-valid'"
          >
            <input
              type="file"
              id="file"
              name="avatar"
              style="display: none"
              accept="image/jpg, image/jpeg"
              @change="getFile"
              ref="uploadedFile"
            />
            <div class="upload__btn">
              <span>Upload</span>
            </div>
            <div class="upload__file">
              <span class="upload__filename" v-if="image.value">{{
                image.value.name
              }}</span>
              <span class="upload__placeholder" v-else>Upload your photo</span>
            </div>
            <span class="upload__error" v-show="!image.isValid">{{
              image.currErr
            }}</span>
            <span class="upload__error" v-show="!userAdded">{{
              serverError
            }}</span>
          </div>
        </label>

        <span v-if="!isValid || !isFill" class="form__submit--disable"
          >Sign up</span
        >
        <span v-else class="form__submit" @click="formSubmit()">Sign up</span>
      </div>
      <div v-else class="signup__success">
        <SuccessImage />
      </div>
    </div>
  </div>
</template>

<script>
import SuccessImage from "@/assets/images/success-image.svg";

export default {
  components: {
    SuccessImage,
  },
  beforeMount() {
    this.$store.dispatch("GET_POSITIONS");
    this.$store.dispatch("GET_TOKEN");
    this.isFirst = true;
  },
  data() {
    return {
      isValid: false,
      isFill: false,
      name: {
        isValid: true,
        currErr: "",
        value: "",
      },
      email: {
        isValid: true,
        currErr: "",
        value: "",
      },
      phone: {
        isValid: true,
        currErr: "",
        value: "",
      },
      positionId: 1,
      image: {
        isValid: true,
        currErr: "",
        value: "",
      },
      phoneMask: "+380#########",
      errors: {
        nameReg:
          "Only latin letters (upper first), spaces, without numbers. Max lenght 60 chars.",
        nameSize: "Name must be at least 3 symblols",
        emailReg: "Wrong email format. For example: user@servise.com",
        phoneReg: "Format: +38 (XXX) XXX - XX - XX",
        fileSize: "Image size must not exceed 5MB",
        fileRes: "Minimal resolution 70x70px",
      },
    };
  },
  computed: {
    positions() {
      return this.$store.getters.POSITIONS;
    },
    token() {
      return this.$store.getters.TOKEN;
    },
    userAdded() {
      return this.$store.getters.USER_ADDED;
    },
    serverError() {
      return this.$store.getters.SERVER_ERROR;
    },
  },
  methods: {
    formSubmit() {
      var formData = new FormData();
      formData.append("name", this.name.value);
      formData.append("email", this.email.value);
      formData.append("phone", this.phone.value);
      formData.append("position_id", this.positionId);
      formData.append("photo", this.image.value);
      this.$store.dispatch("ADD_USER", { user: formData, token: this.token });
    },
    getFile() {
      this.image.value = this.$refs.uploadedFile.files[0];
      this.validateImage();
    },
    validateName() {
      if (
        /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/gm.test(this.name.value) &&
        this.name.value.length < 60
      ) {
        this.name.isValid = true;
        this.checkForm();
      } else {
        this.name.currErr = this.errors.nameReg;
        this.name.isValid = false;
        this.checkForm();
      }
    },
    validateEmail() {
      if (
        /\b[a-z0-9\.-]+@[\w\.-]+\.\w{2,4}\b/.test(this.email.value) &&
        this.email.value.length < 76
      ) {
        this.email.isValid = true;
        this.checkForm();
      } else {
        this.email.currErr = this.errors.emailReg;
        this.email.isValid = false;
      }
    },
    validatePhone() {
      if (this.phoneMask.length === this.phone.value.length) {
        this.phone.isValid = true;
        this.checkForm();
      } else {
        this.phone.currErr = this.errors.phoneReg;
        this.phone.isValid = false;
      }
    },
    validateImage() {
      this.checkResolution();
      if (this.image.value.size < 1024 * 1024 * 5) {
        this.image.isValid = true;
        this.checkForm();
      } else {
        this.image.isValid = false;
        this.image.currErr = this.errors.fileSize;
      }
    },
    checkForm() {
      this.checkIsFill();
      if (
        this.name.isValid &&
        this.email.isValid &&
        this.phone.isValid &&
        this.image.isValid &&
        this.isFill
      ) {
        this.isValid = true;
      } else {
        this.isValid = false;
      }
    },
    checkIsFill() {
      if (
        this.name.value === "" ||
        this.email.value === "" ||
        this.phone.value === "" ||
        this.image.value === ""
      ) {
        this.isFill = false;
      } else {
        this.isFill = true;
      }
    },
    checkResolution() {
      var reader = new FileReader();
      var isValid;

      reader.readAsDataURL(this.image.value);
      reader.onload = function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          var height = this.height;
          var width = this.width;
          if (width >= 70 && height >= 70) {
            isValid = true;
            return true;
          } else {
            isValid = false;
            return false;
          }
        };
      };
      this.image.isValid = isValid;
      this.checkForm();
    },
  },
  watch: {
    "name.value": function () {
      this.validateName();
    },
    "email.value": function () {
      this.validateEmail();
    },
    "phone.value": function () {
      this.validatePhone();
    },
  },
};
</script>

<style></style>
