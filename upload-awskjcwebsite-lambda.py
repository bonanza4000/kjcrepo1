import json
import boto3
import StringIO
import zipfile
import mimetypes

def lambda_handler(event, context):

    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-1:582903906649:KJCWebSite-Deployment-Topic')

    build_location = {
        "bucketName": 'kjc-deployment-pkgs-bucket',
        "objectKey": 'KJCWebSite-GitHub-Build.zip'
    }

    try:
        job = event.get("CodePipeline.job")

        if job:
            for artifact in job["data"]["inputArtifacts"]:
                print "Artifact Name:" + str(artifact["name"])
                if artifact["name"] == "BuildArtifact":
                    build_location = artifact["location"]["s3Location"]

        print "Building portfolio from " + str(build_location)

#        s3 = boto3.resource('s3', config-Config(signature_version='s3v4'))
        s3 = boto3.resource('s3')

        website_bucket = s3.Bucket('www.kennethjcartwright.org')
        build_bucket = s3.Bucket(build_location["bucketName"])

        build_zip = StringIO.StringIO()
        build_bucket.download_fileobj(build_location["objectKey"], build_zip)

        with zipfile.ZipFile(build_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                print "File in Zip:" + nm
                website_bucket.upload_fileobj(obj, nm, ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                website_bucket.Object(nm).Acl().put(ACL='public-read')

        print "Job done."
        topic.publish(Subject="KJCWebSite Deployment Succeeded", Message="KJC WebSite deployed.")
        if job:
            codepipeline = boto3.client('codepipeline')
            print "Job ID:" + job["id"]
            codepipeline.put_job_success_result(jobId = job["id"])

    except:
        topic.publish(Subject="KJCWebSite Deployment Failed", Message="KJC WebSite failed to deploy.")
        raise

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
