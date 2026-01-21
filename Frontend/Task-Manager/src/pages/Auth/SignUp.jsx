import React, { useContext, useState } from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Loader2, Shield, Key } from "lucide-react";
import defaultUserImage from "../../assets/UserDefaultImage.png";
import { UserContext } from "../../_Context/UserContext";
const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInvitedToken, setAdminInvitedToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  //handle signup form submit
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let profileImageUrl = defaultUserImage;

  

    if (!fullName) {
      setError("Please enter your full name");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (!password) {
      setError("Please enter the password");
      setIsLoading(false);
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    setError("");
    //signup API call
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminInvitedToken,
      });
      const { token, role } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);

        //redirect based on role
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full flex justify-center flex-col items-center px-4 pb-8">
        {/* Main signup container */}
        <div className="relative group">
          {/* Epic glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-3xl blur-lg opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          {/* Main card */}
          <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-gray-700/30 w-full max-w-2xl rounded-3xl overflow-hidden">
            
            {/* Animated background patterns */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-56 h-56 bg-gradient-to-br from-emerald-400/10 via-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-400/10 to-emerald-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-emerald-400/5 via-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-spin" style={{animationDuration: '25s'}}></div>
            </div>
            
            {/* Header section */}
            <div className="relative px-8 py-8">
              <div className="text-center space-y-4">
                {/* Status badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-purple-50 dark:from-emerald-900/20 dark:to-purple-900/20 rounded-full border border-emerald-200/50 dark:border-emerald-700/50">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">Join Elite Workspace</span>
                </div>
                
                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-3xl font-black bg-gradient-to-r from-gray-900 via-emerald-800 to-purple-800 dark:from-white dark:via-emerald-200 dark:to-purple-200 bg-clip-text text-transparent">
                    Create Account
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">
                    Join our exclusive productivity workspace
                  </p>
                </div>

                {/* Decorative line */}
                <div className="flex items-center justify-center">
                  <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Form section */}
            <form onSubmit={handleSignUp} className="relative px-8 pb-8 space-y-6">
              
              {/* Profile Photo Selector */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-2  rounded-full opacity-20 blur-lg animate-pulse"></div>
                  <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Full Name Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl opacity-0 blur-sm transition-opacity duration-300 ${focusedField === 'fullName' ? 'opacity-20' : ''}`}></div>
                    <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'fullName' ? 'text-emerald-500' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      value={fullName}
                      onChange={({ target }) => setFullName(target.value)}
                      onFocus={() => setFocusedField('fullName')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      className="relative w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 blur-sm transition-opacity duration-300 ${focusedField === 'email' ? 'opacity-20' : ''}`}></div>
                    <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} />
                    <input
                      type="email"
                      value={email}
                      onChange={({ target }) => setEmail(target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@company.com"
                      className="relative w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 blur-sm transition-opacity duration-300 ${focusedField === 'password' ? 'opacity-20' : ''}`}></div>
                    <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'password' ? 'text-purple-500' : 'text-gray-400'}`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Min 8 characters"
                      className="relative w-full pl-12 pr-12 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 p-1"
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Admin Invite Token */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                    Admin Invite Token
                  </label>
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl opacity-0 transition-opacity duration-300 ${focusedField === 'token' ? 'opacity-50' : ''}`}></div>
                    <Key className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${focusedField === 'token' ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      value={adminInvitedToken}
                      onChange={({ target }) => setAdminInvitedToken(target.value)}
                      onFocus={() => setFocusedField('token')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="6 Digit Code"
                      className="relative w-full pl-12 pr-4 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-medium"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-red-500/10 rounded-xl blur-sm"></div>
                  <div className="relative flex items-center gap-3 p-4 bg-red-50/80 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800/50 rounded-xl backdrop-blur-sm">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    <p className="text-red-600 dark:text-red-400 text-sm font-semibold">{error}</p>
                  </div>
                </div>
              )}

              {/* Submit button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden"
                >
                  {/* Button glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 rounded-xl blur opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Button content */}
                  <div className="relative bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 hover:from-emerald-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                    <div className="flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span className="font-black uppercase tracking-wide">Creating Account...</span>
                        </>
                      ) : (
                        <>
                          <span className="font-black uppercase tracking-wide">Join Workspace</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </>
                      )}
                    </div>
                  </div>
                </button>
              </div>

              {/* Login link */}
              <div className="text-center pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 transition-all duration-200"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </p>
              </div>

            </form>

            {/* Security footer */}
            <div className="relative px-8 pb-6">
              <div className="flex items-center justify-center gap-8 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="font-semibold">Secure Registration</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold">Invitation Verified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-500" />
                  <span className="font-semibold">Privacy First</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating particles */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-ping" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400/40 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-purple-400/20 rounded-full animate-ping" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-emerald-400/25 rounded-full animate-ping" style={{animationDelay: '0.8s'}}></div>
          <div className="absolute top-2/3 left-2/3 w-2 h-2 bg-blue-400/35 rounded-full animate-ping" style={{animationDelay: '1.2s'}}></div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;