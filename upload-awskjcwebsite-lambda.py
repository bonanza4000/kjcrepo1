iimport json
import boto3
import StringIO
import zipfile
import mimetypes

def lambda_handler(event, context):

    sns = boto3.resource('sns')
    topic = sns.Topic('arn:aws:sns:us-east-1:582903906649:KJCWebSite-Deployment-Topic')

    try:
        s3 = boto3.resource('s3')

        build_bucket = s3.Bucket('kjc-deployment-pkgs-bucket')
        website_bucket = s3.Bucket('www.kennethjcartwright.org')

        build_zip = StringIO.StringIO()
        build_bucket.download_fileobj('KJCWebSite-GitHub-Build.zip', build_zip)

        with zipfile.ZipFile(build_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                print(nm)
                website_bucket.upload_fileobj(obj, nm, ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})

                website_bucket.Object(nm).Acl().put(ACL='public-read')

        topic.publish(Subject="KJCWebSite Deployment Succeeded", Message="KJC WebSite deployed.")

    except:
        topic.publish(Subject="KJCWebSite Deployment Failed", Message="KJC WebSite failed to deploy.")
        raise

    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
