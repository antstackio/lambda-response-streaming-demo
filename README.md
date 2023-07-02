# Lambda Response Streaming Demo

## How to:
  1. Setup Repository secrets in github repo.\
    -   Repository Settings --> Secrets and variables\
    -   Use these keys to setup repository secrets `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`

  2. Edit `samconfig.toml` file.\
    -   change `stack_name`, `s3_bucket_for_artifacts`, `s3_prefix`.\
    -   `stack_name` is being used as cloudformation stack name.\
    -   `s3_bucket_for_artifacts` is being used to create S3 bucket to store artifacts when sam builds.\
    -   change `parameter_overrides` as well for all three sub-parameters.

  3. If the S3 Bucket for Artifacts is already present in AWS, then it will skip the creation for artifacts s3 bucket \
     and continue with the remaining steps in the github action.

  4. Else if, there is no S3 bucket present in AWS, then it will create the artifact s3 bucket\
     but it will skip all the remaining steps in github action.
     
  5. Just Re-Run the job, if you encounter step 4.
   
  6. You can use `sourceData.xlsx` file for source data in your dynamodb to get the results on the webpage.

### Deployed Link:
- You can find the deployed project cloudfront link / webpage link in your github actions tab.
- Or you can check your cloudformation console --> Outputs tab to get cloudfront link / webpage link.