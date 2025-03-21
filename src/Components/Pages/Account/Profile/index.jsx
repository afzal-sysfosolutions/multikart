'use client';
import AccountSidebar from '../Common/AccountSidebar';
import { Col, TabContent, TabPane } from 'reactstrap';
import ProfileContent from './ProfileContent';
import ResponsiveMenuOpen from '../Common/ResponsiveMenuOpen';
import Breadcrumbs from '@/Utils/CommonComponents/Breadcrumb';
import WrapperComponent from '@/Components/Widgets/WrapperComponent';

const AccountProfile = (hideprofile) => {
  return (
    <>
      <Breadcrumbs title={'Profile'} subNavigation={[{ name: 'Profile ' }]} />
      <WrapperComponent classes={{ sectionClass: 'dashboard-section section-b-space user-dashboard-section', fluidClass: 'container' }} customCol={true}>
        <AccountSidebar tabActive={'profile'} />
        <Col xxl={9} lg={8}>
          <ResponsiveMenuOpen />
          <div className='dashboard-right-sidebar'>
            <TabContent>
              <TabPane className='show active'>
                <ProfileContent hideprofile={hideprofile}/>
              </TabPane>
            </TabContent>
          </div>
        </Col>
      </WrapperComponent>
    </>
  );
};

export default AccountProfile;

