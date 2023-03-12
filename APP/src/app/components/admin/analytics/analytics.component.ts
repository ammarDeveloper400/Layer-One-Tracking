import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, first } from 'rxjs';
import { GraphDataDto } from 'src/app/models/graph.model';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  chartOptions: any = {};
  graphDataEmitter$ = new BehaviorSubject<GraphDataDto>(null);
  totalViews: string = '';
  totalReads: string = '';
  totalRecommends: string = '';
  initialDaysCount: number = 15;
  activeClass: string = 'active';
  inActiveClass: string = 'inactive';

  isViewCount: boolean = true;
  isReadCount: boolean = false;
  isRecommendCount: boolean = false;

  constructor(private router: Router,
    private toastr: ToastrService,
    public adminService: AdminService) { 
  }

  ngOnInit(): void {
    this.GetGraphData();
  }

  GetGraphData() {
    this.adminService
      .GetGraphData(this.initialDaysCount)
      .pipe(first())
      .subscribe({
        next: (data) => {
          debugger
          this.graphDataEmitter$.next(data.data);
          this.totalViews = data.data.sumViewCount;
          this.totalReads = data.data.sumReadCount;
          this.totalRecommends = data.data.sumRecommendCount;
          this.GetViewsData();
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  FifteenDays()
  {
    this.activeClass = 'active';
    this.inActiveClass = 'inactive';
    this.initialDaysCount = 15;
    this.GetGraphData();
  }

  ThirtyDays()
  {
    this.activeClass = 'inactive';
    this.inActiveClass = 'active';
    this.initialDaysCount = 30;
    this.GetGraphData();
  }

  GetViewsData()
  {
    this.isViewCount = true;
    this.isReadCount = false;
    this.isRecommendCount = false;

    this.graphDataEmitter$.subscribe(parameter => {
      this.chartOptions = getChartOptions(parameter.viewCountIds.map(x=>+x), parameter.dateIds)
    })
  }

  GetReadsData()
  {
    this.isViewCount = false;
    this.isReadCount = true;
    this.isRecommendCount = false;

    this.graphDataEmitter$.subscribe(parameter => {
      this.chartOptions = getChartOptions(parameter.readCountIds.map(x=>+x), parameter.dateIds)
    })
  }

  GetRecommendsData()
  {
    this.isViewCount = false;
    this.isReadCount = false;
    this.isRecommendCount = true;

    this.graphDataEmitter$.subscribe(parameter => {
      this.chartOptions = getChartOptions(parameter.totalRecommendIds.map(x=>+x), parameter.dateIds)
    })
  }
}

function getChartOptions(viewCountIds: any, dateIds: any) {
  const labelColor = getCSSVariableValue('--kt-gray-500');
  const borderColor = getCSSVariableValue('--kt-gray-200');
  const baseColor = getCSSVariableValue('--kt-primary');
  const secondaryColor = getCSSVariableValue('--kt-gray-300');

  return {
    series: [
      {
        name: 'Blog',
        data: viewCountIds
      }
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: dateIds,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: number) {
          return;
        },
      },
    },
    colors: ['#1a53ff'],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
}

function getCSSVariableValue(variableName: string) {
  let hex = getComputedStyle(document.documentElement).getPropertyValue(
    variableName
  );
  if (hex && hex.length > 0) {
    hex = hex.trim();
  }

  return hex;
}