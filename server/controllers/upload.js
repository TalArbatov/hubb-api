const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const config = require('../../config');

const {secretKey, accessKey, bucketName} = config.aws;

const s3 = new AWS.S3({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    signatureVersion: 'v4',
    region: 'eu-west-2'
})

//image key secure stracture: userID / <random character string>.<file extention> 

module.exports = {

}