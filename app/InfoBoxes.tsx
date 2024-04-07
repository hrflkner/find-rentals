import InfoBox from '../components/InfoBox'

export default function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            backgroundColor="bg-gray-700"
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
            backgroundColor="bg-blue-800"
            buttonInfo={{
              link: '/properties/add',
              text: 'Add Property',
              backgroundColor: 'bg-gray-700',
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
