
#handle args
import argparse


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--supabase-url', help='Supabase project URL, defaults to env variable' )
    parser.add_argument('--supabase-anon-key', help='Supabase anon key, defaults to env variable' )
    parser.add_argument('--supabase-secret-key', help='Supabase secret key, defaults to env variable' )
    

    args = parser.parse_args()
  


