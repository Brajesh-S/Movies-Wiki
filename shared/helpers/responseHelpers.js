
const formatResponse = (data, error, message) => {
    return {
        data: data || null,
        error: error || false,
        message: message || null,
    };
};

module.exports = {
    formatResponse,
};