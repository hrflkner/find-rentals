import InfoBox from '../components/InfoBox'

export default function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-16 px-4 sm:px-0 py-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            backgroundColor="bg-gray-800"
            buttonInfo={{
              link: '/properties',
              text: 'Browse Properties',
              backgroundColor: 'bg-black',
            }}
          >
            Find your dream rental property, Bookmark properties, and contact
            owners.
          </InfoBox>
          <InfoBox
            heading="For Property Owners"
            backgroundColor="bg-blue-900"
            buttonInfo={{
              link: '/properties/add',
              text: 'Add Property',
              backgroundColor: 'bg-black',
            }}
          >
            Find your dream rental property, Bookmark properties, and contact
            owners.
          </InfoBox>
        </div>
      </div>
    </section>
  )
}
