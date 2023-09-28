from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.operators.hdfs_operator import HdfsPutFileOperator
from airflow.providers.apache.spark.operators.spark_submit import SparkSubmitOperator
from datetime import datetime, timedelta

# DAG 정의
default_args = {
    'owner': 'moa',
    'depends_on_past': False,
    'start_date': datetime(2023, 10, 1),
    'retries': 1,
    'retry_delay': timedelta(minutes=5),
}

dag = DAG(
    'crawler_and_analysis',
    default_args=default_args,
    description='Crawl, analyze, and store data',
    schedule_interval='@daily',  # 크론식을 사용하여 실행 빈도 설정
    catchup=False,
)

# 크롤러 코드 실행
crawl_task = PythonOperator(
    task_id='run_crawler',
    python_callable=article_crawler.py,  # 크롤러 코드를 실행하는 함수
    dag=dag,
)

# JSON 파일을 HDFS에 저장
hdfs_task = HdfsPutFileOperator(
    task_id='save_to_hdfs',
    local_file='로컬파일경로.json',
    remote_file='hdfs경로.json',
    hdfs_conn_id='hdfs_default',
    dag=dag,
)

# PySpark 코드 실행
spark_task = SparkSubmitOperator(
    task_id='run_spark_analysis',
    application='pysparkex.py',  # PySpark 스크립트 경로
    conf={'spark.executor.memory': '2g'},
    dag=dag,
)

# Task 간의 의존성 설정
crawl_task >> hdfs_task >> spark_task
