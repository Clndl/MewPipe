var mongoose = require('./bdd.js').mongoose;

shareSchema = mongoose.Schema({
	_user: { 
		type: String,
		required: true,
		ref: 'User'
	},
	_video: { 
		type: String,
		required: true,
		ref: 'Video'
	},
	created: {
		type: Date,
		default: Date.now
	}
});
shareModel = mongoose.model('Share', shareSchema);

exports.Share = shareModel;