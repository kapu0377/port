const checkAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({
            success: false,
            message: '로그인이 필요한 서비스입니다.'
        });
    }
    next();
};

const checkAdmin = (req, res, next) => {
    if (!req.session?.user?.isAdmin) {
        return res.status(403).json({
            success: false,
            message: '관리자 권한이 필요한 서비스입니다.'
        });
    }
    next();
};

module.exports = {
    checkAuth,
    checkAdmin
}; 