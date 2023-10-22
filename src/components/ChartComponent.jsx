import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { format, parseISO, subDays} from "date-fns"
import "./ChartComponent.css"

function ChartComponent({ data }) {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart width="100%"
          height={300}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }} >
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor='#a6abb6' stopOpacity={0.4}/>
                <stop offset="75%" stopColor='#a6abb6' stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <Area dataKey="amount" stroke="#a6abb6" fill="url(#color)"/>
            <XAxis 
              dataKey="date" 
              tickFormatter={(dat) => {
                const date = parseISO(dat)
                if(date.getDate() % 7 === 0){
                  return format(date, "MMM, d")
                }
                return "";
              }}
            />
            <YAxis dataKey="amount" tickCount={4} />
            <Tooltip content={<CustomTooltip/>}/>
            <CartesianGrid opacity={0.5} vertical={false}/>
        </AreaChart>
      </ResponsiveContainer>
    );
}

export default ChartComponent;

function CustomTooltip({active, payload, label}) {
  if (active) {
    return <div className='tooltip'>
      <h4>{label && format(parseISO(label), "eee, d, MMM, yyyy")}</h4>
      <p>
        {payload[0].value}
      </p>
    </div>
  }
  return null
}
