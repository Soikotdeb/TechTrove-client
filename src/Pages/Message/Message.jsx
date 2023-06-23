import { Link } from 'react-router-dom';
import image from '../../assets/image/galaxy-fold_highlight_kv_silver_end.png';

const Message = () => {
  return (
    <div className='mb-40 relative items-center'> 
      <div>
      <div className='ml-4 absolute mt-32'> 
        <img className='w-96 h-60' src={image} alt="" />
      </div>
      <div className=" p-10 bg-neutral text-neutral-content  w-full">
        <div className="text-center">
          <p>SMARTPHONE COLLECTION</p>
          <p className="text-3xl">WE TAKE PRE-ORDER OF ANY<br />PRODUCTS & DELIVER WITHIN<br />3 to 7 DAYS</p>
          <div className='mt-6'>
          <Link
          to=""
          className=" bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full focus:outline-none shadow-md transition-shadow duration-300"
        >
         PRE-ORDER Now 
        </Link>
          </div>
        </div>
        
      </div>
      </div>

    </div>
  );
};

export default Message;
